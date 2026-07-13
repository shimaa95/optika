# Enquiry Form → Sanity + Resend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/contact/enquiry` actually submit — persist submissions to a new `enquirySubmission` Sanity document type, and email the team via Resend.

**Architecture:** A Next.js Server Action does the heavy lifting: validate with Zod, write to Sanity with a write-enabled client, then send a Resend email. Email failure doesn't roll back the Sanity write (the lead is the primary value). A honeypot field filters obvious bots. The form is wired to the existing `enquiryPage` Sanity document so editors can change field labels and interest options without code changes.

**Tech Stack:** Next.js 16 App Router, React 19 Server Actions, `useActionState`, Sanity (`@sanity/client` v7, `next-sanity` v9), Resend SDK, Zod 4, Tailwind v4, shadcn/ui (sonner toast).

**Spec:** `docs/superpowers/specs/2026-07-13-enquiry-form-sanity-design.md`

**Bar (per project `CLAUDE.md`):** No new lint errors, no new build errors, no console errors in dev. There is no test runner — verification is manual smoke tests.

---

## File Structure

### New files

| File | Responsibility |
|---|---|
| `sanity/schemaTypes/documents/enquirySubmission.ts` | New document type for form submissions (Studio-only — not consumed by any public page query) |
| `sanity/lib/write-client.ts` | `@sanity/client` instance with `token: SANITY_API_WRITE_TOKEN` and `useCdn: false` |
| `app/actions/submit-enquiry.ts` | Server Action: validate → Sanity create → Resend send → return state |
| `app/actions/submit-enquiry.email.ts` | Pure email-body renderer (extracted for readability and testability) |
| `app/contact/enquiry/enquiry-form.tsx` | Client form component with `useActionState` and honeypot field |

### Modified files

| File | Change |
|---|---|
| `sanity/schemaTypes/index.ts` | Register `enquirySubmission` in the `types` array |
| `sanity.config.ts` | Extend desk structure to add "Enquiries" list view (see `sanity/structure.ts`) |
| `sanity/structure.ts` | Add an "Enquiries" list item filtered to `enquirySubmission` |
| `app/contact/enquiry/page.tsx` | Convert from client form to a server component that fetches the `enquiryPage` document and renders `<EnquiryForm data={...} />` |
| `sanity/lib/queries.ts` | Add `ENQUIRY_PAGE_QUERY` for the form's editable content |
| `package.json` | Add `resend` dependency |
| `.env.local` | Add `SANITY_API_WRITE_TOKEN`, `RESEND_API_KEY`, `TEAM_INBOX` (no values committed) |

---

## Task 1: Add Resend dependency and env scaffolding

**Files:**
- Modify: `package.json` (auto via pnpm)
- Modify: `.env.local` (manual — only adds new keys, never touches existing values)

- [ ] **Step 1: Install Resend**

Run:
```bash
pnpm add resend
```

Expected: package added to `dependencies` in `package.json`, `pnpm-lock.yaml` updated.

- [ ] **Step 2: Add new env keys to `.env.local`**

Read the existing file first to confirm the keys already present (don't disturb them):
```bash
cat .env.local
```

Add three new lines at the end of `.env.local` (do NOT delete or modify existing lines):
```
SANITY_API_WRITE_TOKEN=
RESEND_API_KEY=
TEAM_INBOX=
```

Leave the values empty for now — they get filled in by the developer at deploy time. Do not commit `.env.local` (it's already in `.gitignore`).

- [ ] **Step 3: Commit the dependency change only (env file is not committed)**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add resend for enquiry form notifications"
```

---

## Task 2: Create the `enquirySubmission` Sanity document type

**Files:**
- Create: `sanity/schemaTypes/documents/enquirySubmission.ts`
- Modify: `sanity/schemaTypes/index.ts` (register the new type)

- [ ] **Step 1: Create the schema file**

Create `sanity/schemaTypes/documents/enquirySubmission.ts` with this content:

```ts
import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

/**
 * Form submission from /contact/enquiry. Studio-only — not referenced
 * by any public page query. Editors triage via the `status` field.
 */
export const enquirySubmission = defineType({
  name: 'enquirySubmission',
  title: 'Enquiry Submission',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (rule) => rule.min(1).error('At least one interest must be selected'),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Notes for the team — not visible to the submitter',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      date: 'submittedAt',
      status: 'status',
    },
    prepare: ({ title, subtitle, date, status }) => ({
      title,
      subtitle,
      description: `${status ?? 'new'} · ${date ? new Date(date).toLocaleString() : 'no date'}`,
    }),
  },
})
```

- [ ] **Step 2: Register the type in the schema barrel**

In `sanity/schemaTypes/index.ts`, add an import near the other document imports (after line 16, the `sharedFooter` import):

```ts
import { enquirySubmission } from './documents/enquirySubmission'
```

Then add `enquirySubmission,` to the `types` array (after `sharedFooter,` in the documents section, around line 81).

- [ ] **Step 3: Lint check**

Run:
```bash
pnpm lint
```

Expected: no new errors. If there are errors, fix them inline before continuing.

- [ ] **Step 4: Commit**

```bash
git add sanity/schemaTypes/documents/enquirySubmission.ts sanity/schemaTypes/index.ts
git commit -m "feat(sanity): add enquirySubmission document type"
```

---

## Task 3: Add an "Enquiries" view to the Studio desk structure

**Files:**
- Modify: `sanity/structure.ts`

- [ ] **Step 1: Read the existing structure file**

Run:
```bash
cat sanity/structure.ts
```

- [ ] **Step 2: Add an Enquiries list item**

The exact edit depends on what's currently in the file. The goal is to add a new top-level menu item to the desk structure that:
- title: "Enquiries"
- shows all documents of type `enquirySubmission`
- sorts by `submittedAt desc` (already configured in the schema's orderings)

Pattern to add (adapt to the existing file's structure — if it uses `S.list().title('...').items([...])`, splice this in):

```ts
S.listItem()
  .title('Enquiries')
  .child(
    S.documentTypeList('enquirySubmission')
      .title('Enquiries')
      .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
  )
```

If the existing `structure.ts` is empty or a placeholder, replace it with:

```ts
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons and other existing items go here — preserve them.
      S.listItem()
        .title('Enquiries')
        .child(
          S.documentTypeList('enquirySubmission')
            .title('Enquiries')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
        ),
    ])
```

Whatever the existing structure looks like, **preserve the existing items** and add the Enquiries item alongside them.

- [ ] **Step 3: Lint check**

Run:
```bash
pnpm lint
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add sanity/structure.ts
git commit -m "feat(sanity): add Enquiries list view to Studio desk"
```

---

## Task 4: Create the Sanity write client

**Files:**
- Create: `sanity/lib/write-client.ts`

- [ ] **Step 1: Create the write client file**

Create `sanity/lib/write-client.ts`:

```ts
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/**
 * Sanity client for server-side writes (form submissions, etc.).
 *
 * Uses `useCdn: false` so the response is the authoritative state
 * (a `create` must not be served from cache). Requires
 * `SANITY_API_WRITE_TOKEN` to be set; we fail loudly at module load
 * if it's missing rather than at first write so misconfigurations
 * surface in dev.
 */
function assertToken(token: string | undefined): string {
  if (!token) {
    throw new Error(
      'Missing environment variable: SANITY_API_WRITE_TOKEN'
    )
  }
  return token
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: assertToken(process.env.SANITY_API_WRITE_TOKEN),
})
```

- [ ] **Step 2: Lint check**

Run:
```bash
pnpm lint
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/write-client.ts
git commit -m "feat(sanity): add write-enabled client for form submissions"
```

---

## Task 5: Create the Server Action

**Files:**
- Create: `app/actions/submit-enquiry.email.ts`
- Create: `app/actions/submit-enquiry.ts`

- [ ] **Step 1: Create the email body renderer**

Create `app/actions/submit-enquiry.email.ts`:

```ts
export type EnquiryEmailPayload = {
  fullName: string
  email: string
  company: string
  interests: string[]
  message: string
}

function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function renderEnquiryEmail(p: EnquiryEmailPayload): string {
  const interests = p.interests.map(escape).join(', ') || '(none)'
  return `
    <h2>New enquiry from ${escape(p.fullName)}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><strong>Email</strong></td><td>${escape(p.email)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escape(p.company)}</td></tr>
      <tr><td><strong>Interests</strong></td><td>${interests}</td></tr>
    </table>
    <h3>Message</h3>
    <p>${escape(p.message).replace(/\n/g, '<br>')}</p>
  `
}
```

- [ ] **Step 2: Create the Server Action**

Create `app/actions/submit-enquiry.ts`:

```ts
'use server'

import { Resend } from 'resend'
import { z } from 'zod'

import { writeClient } from '@/sanity/lib/write-client'
import { renderEnquiryEmail } from './submit-enquiry.email'

export type EnquiryFormState = {
  success: boolean
  error?: string
}

const enquirySchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  company: z.string().min(1).max(200),
  interests: z.array(z.string().min(1)).min(1).max(10),
  message: z.string().min(10).max(5000),
  website: z.string().optional(), // honeypot
})

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error('Missing environment variable: RESEND_API_KEY')
  }
  return new Resend(key)
}

function getTeamInbox(): string {
  const inbox = process.env.TEAM_INBOX
  if (!inbox) {
    throw new Error('Missing environment variable: TEAM_INBOX')
  }
  return inbox
}

export async function submitEnquiryAction(
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const raw = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    company: formData.get('company'),
    interests: formData.getAll('interests'),
    message: formData.get('message'),
    website: formData.get('website'),
  }

  // Honeypot: silent success so bots don't learn the field is a trap.
  if (typeof raw.website === 'string' && raw.website.length > 0) {
    return { success: true }
  }

  const parsed = enquirySchema.safeParse(raw)
  if (!parsed.success) {
    console.error('[enquiry] validation failed', parsed.error.flatten())
    return { success: false, error: 'Please check the form fields.' }
  }

  const { website: _honeypot, ...data } = parsed.data

  let submissionId: string
  try {
    const doc = await writeClient.create({
      _type: 'enquirySubmission',
      submittedAt: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      company: data.company,
      interests: data.interests,
      message: data.message,
      status: 'new',
    })
    submissionId = doc._id
  } catch (err) {
    console.error('[enquiry] sanity write failed', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  // Email is best-effort: the submission is already saved.
  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'Optika Enquiries <enquiries@optika.com>',
      to: getTeamInbox(),
      subject: `New enquiry from ${data.fullName}`,
      html: renderEnquiryEmail(data),
    })
  } catch (err) {
    console.error('[enquiry] resend failed', err, { submissionId })
  }

  return { success: true }
}
```

- [ ] **Step 3: Lint check**

Run:
```bash
pnpm lint
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add app/actions/submit-enquiry.ts app/actions/submit-enquiry.email.ts
git commit -m "feat(actions): add submitEnquiry Server Action with Resend notification"
```

---

## Task 6: Wire the form to the `enquiryPage` document and the Server Action

**Files:**
- Modify: `sanity/lib/queries.ts` (add `ENQUIRY_PAGE_QUERY`)
- Create: `app/contact/enquiry/enquiry-form.tsx`
- Modify: `app/contact/enquiry/page.tsx` (convert to server component, render `<EnquiryForm>`)

- [ ] **Step 1: Add the GROQ query**

In `sanity/lib/queries.ts`, append a new query at the end of the file:

```ts
/**
 * Enquiry form page content. Used by /contact/enquiry to render the
 * editable form copy and interest options.
 *
 * - `formFields[]` is rendered by matching each entry's `name` (added
 *   inline below) to one of: `fullName` | `email` | `company` | `message`.
 *   Entries with an unknown `name` are ignored — keeps the server-side
 *   validation shape stable.
 * - `interestOptions[]` powers the checkbox group bound to `interests[]`.
 * - All strings are coalesced to "" so the form component can rely on
 *   string-typed props.
 */
export const ENQUIRY_PAGE_QUERY = defineQuery(`
  *[_type == "enquiryPage"][0]{
    "formTitle":       coalesce(formTitle, "ENQUIRY FORM"),
    "introText":       coalesce(introText, ""),
    "submitButtonLabel": coalesce(submitButtonLabel, "SUBMIT"),
    "copyrightText":   coalesce(copyrightText, "© 2024 Optika Lenses"),
    "sideImage":       sideImage,
    "formFields": formFields[]{
      _key,
      "name":       coalesce(name, ""),
      "label":      coalesce(label, ""),
      "placeholder": coalesce(placeholder, ""),
      "fieldType":  coalesce(fieldType, "text"),
      required
    },
    "interestOptions": interestOptions[]{
      _key,
      "label": coalesce(label, "")
    }
  }
`)
```

The `formFields` projection includes a `name` field that the existing `enquiryPage` schema does NOT have. We need to add it. The next step does that.

- [ ] **Step 2: Add the `name` field to the `formFields` inline object in `enquiryPage`**

In `sanity/schemaTypes/documents/enquiryPage.ts`, inside the `formFields` array's `defineArrayMember` object (around line 49), add a new `defineField` for `name` at the top of the fields array (before `label`):

```ts
defineField({
  name: 'name',
  title: 'Submission Key',
  description: 'Which form field this maps to. Must be one of: fullName, email, company, message.',
  type: 'string',
  options: {
    list: [
      { title: 'Full Name', value: 'fullName' },
      { title: 'Email', value: 'email' },
      { title: 'Company', value: 'company' },
      { title: 'Message', value: 'message' },
    ],
  },
}),
```

- [ ] **Step 3: Create the form component**

Create `app/contact/enquiry/enquiry-form.tsx`:

```tsx
'use client'

import { useActionState, useRef, useEffect } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

import {
  submitEnquiryAction,
  type EnquiryFormState,
} from '@/app/actions/submit-enquiry'

const INITIAL_STATE: EnquiryFormState = { success: false }

type FormField = {
  _key: string
  name: string
  label: string
  placeholder: string
  fieldType: 'text' | 'email' | 'textarea' | 'checkbox' | string
  required?: boolean
}

type InterestOption = {
  _key: string
  label: string
}

type EnquiryFormProps = {
  formTitle: string
  introText: string
  submitButtonLabel: string
  copyrightText: string
  formFields: FormField[]
  interestOptions: InterestOption[]
}

function renderField(
  field: FormField,
  inputClass: string,
  textareaClass: string
) {
  // Skip fields whose name is unknown — keeps the server-validated
  // shape stable even if an editor leaves a stale entry.
  if (!['fullName', 'email', 'company', 'message'].includes(field.name)) {
    return null
  }
  if (field.fieldType === 'textarea') {
    return (
      <textarea
        key={field._key}
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        rows={4}
        className={textareaClass}
      />
    )
  }
  return (
    <input
      key={field._key}
      type={field.fieldType === 'email' ? 'email' : 'text'}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      className={inputClass}
    />
  )
}

export function EnquiryForm({
  formTitle,
  introText,
  submitButtonLabel,
  copyrightText,
  formFields,
  interestOptions,
}: EnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitEnquiryAction,
    INITIAL_STATE
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      toast.success("Thanks — we'll be in touch shortly.")
      formRef.current?.reset()
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  const inputClass =
    'w-full bg-transparent border border-neutral-600 px-4 py-3.5 text-[11px] uppercase tracking-wider text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors rounded-none'
  const textareaClass =
    'w-full bg-transparent border border-neutral-600 px-4 py-3.5 text-[11px] uppercase tracking-wider text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors resize-none rounded-none'

  return (
    <>
      <h1 className="text-[32px] font-bold tracking-tight mb-2 uppercase leading-tight">
        {formTitle}
      </h1>
      {introText ? (
        <p className="text-[12px] md:text-[13px] text-neutral-400 mb-10">
          {introText}
        </p>
      ) : null}

      <form ref={formRef} action={formAction} className="space-y-6">
        {/* Honeypot — hidden, real users never fill it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {formFields.map((f) => (
          <div key={f._key}>
            {renderField(f, inputClass, textareaClass)}
          </div>
        ))}

        {interestOptions.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-4 text-left">
              Area of Interest *
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
              {interestOptions.map((opt) => (
                <label
                  key={opt._key}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      name="interests"
                      value={opt.label}
                      className="w-3.5 h-3.5 appearance-none border border-neutral-400 checked:bg-white checked:border-white transition-colors cursor-pointer peer"
                    />
                    <svg
                      className="absolute w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-wider py-4 hover:bg-neutral-950 transition-colors rounded-none mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending…' : submitButtonLabel}
        </button>
      </form>

      <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-500 tracking-widest mt-8">
        <p>{copyrightText}</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Convert the page to a server component**

Replace the contents of `app/contact/enquiry/page.tsx` with:

```tsx
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { ENQUIRY_PAGE_QUERY } from '@/sanity/lib/queries'
import { EnquiryForm } from './enquiry-form'

export const dynamic = 'force-dynamic'

export default async function EnquiryFormPage() {
  const { data } = await sanityFetch({
    query: ENQUIRY_PAGE_QUERY,
    perspective: 'published',
    stega: false,
  })

  // Hard fallback to the historical defaults if the singleton has never
  // been populated in the Studio.
  const fallbackFields = [
    { _key: 'fullName', name: 'fullName', label: 'Full Name', placeholder: 'FULL NAME *', fieldType: 'text', required: true },
    { _key: 'email', name: 'email', label: 'Email', placeholder: 'EMAIL *', fieldType: 'email', required: true },
    { _key: 'company', name: 'company', label: 'Company', placeholder: 'COMPANY NAME *', fieldType: 'text', required: true },
    { _key: 'message', name: 'message', label: 'Message', placeholder: 'MESSAGE *', fieldType: 'textarea', required: true },
  ]
  const fallbackInterests = [
    { _key: 'p1', label: "PRODUCTS & SOLUTIONS" },
    { _key: 'p2', label: "BUSINESS & OPPORTUNITY'S" },
    { _key: 'p3', label: 'ACUTUS' },
    { _key: 'p4', label: 'OTHER' },
  ]

  const formTitle = data?.formTitle ?? 'ENQUIRY FORM'
  const introText =
    data?.introText ?? 'Kindly fill the following form to address your enquiry.'
  const submitButtonLabel = data?.submitButtonLabel ?? 'SUBMIT'
  const copyrightText = data?.copyrightText ?? '© 2024 Optika Lenses'
  const formFields = (data?.formFields?.length ?? 0) > 0
    ? data!.formFields
    : fallbackFields
  const interestOptions = (data?.interestOptions?.length ?? 0) > 0
    ? data!.interestOptions
    : fallbackInterests
  const sideImageUrl = data?.sideImage?.asset?.url

  return (
    <section className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">
      <div className="bg-[#131313] text-white lg:w-1/2 flex flex-col justify-between pl-6 lg:pl-26 2xl:pl-50 pr-6 lg:pr-20 pt-14 pb-4 relative min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">
        <div className="max-w-[480px] w-full my-auto">
          <EnquiryForm
            formTitle={formTitle}
            introText={introText}
            submitButtonLabel={submitButtonLabel}
            copyrightText={copyrightText}
            formFields={formFields}
            interestOptions={interestOptions}
          />
        </div>
      </div>

      <div className="relative h-[40vh] lg:h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] lg:sticky lg:top-[50px] xl:top-[75px] overflow-hidden shrink-0 lg:w-1/2">
        {sideImageUrl ? (
          <Image
            src={sideImageUrl}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <Image
            src="/form.png"
            alt="Models wearing Optika eyewear"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Lint check**

Run:
```bash
pnpm lint
```

Expected: no new errors. If there are errors, fix them inline.

- [ ] **Step 6: Build smoke test**

Run:
```bash
pnpm build
```

Expected: build completes (the project has `typescript.ignoreBuildErrors: true`, so this is a smoke test for runtime/build-time errors, not type errors). If the build fails, fix the issue before continuing.

- [ ] **Step 7: Commit**

```bash
git add app/contact/enquiry/page.tsx app/contact/enquiry/enquiry-form.tsx sanity/lib/queries.ts sanity/schemaTypes/documents/enquiryPage.ts
git commit -m "feat(enquiry): wire form to Sanity content + Server Action"
```

---

## Task 7: End-to-end manual smoke test

This task is verification only — no code changes. The bar is: the form works.

- [ ] **Step 1: Set the env vars locally**

Fill in the three new env keys in `.env.local` with real values:
- `SANITY_API_WRITE_TOKEN` — the same value as the existing `WRITE_TOKEN` (it's the same Sanity token, just renamed)
- `RESEND_API_KEY` — from your Resend dashboard
- `TEAM_INBOX` — the email address that should receive enquiries

- [ ] **Step 2: Start the dev server**

Run:
```bash
pnpm dev
```

Expected: server starts on `http://localhost:3000` without errors.

- [ ] **Step 3: Test the happy path**

1. Navigate to `http://localhost:3000/contact/enquiry`.
2. Fill all four text fields and check at least one interest.
3. Click Submit.
4. Expected: button shows "Sending…", then a success toast appears, and the form resets.
5. Open the Sanity Studio (`/studio`) → Enquiries view → confirm a new doc with your test data.
6. Check the `TEAM_INBOX` → confirm the email arrived.

If any of these fail, the most likely cause is the env vars. Check the dev-server console for the `[enquiry]` log lines.

- [ ] **Step 4: Test the honeypot**

1. Open DevTools → Elements inspector.
2. Find the hidden `<input name="website">` and set its `value` attribute to `"bot"`.
3. Click Submit.
4. Expected: success toast appears, but **no** new Sanity doc is created and **no** email is sent.

- [ ] **Step 5: Test the validation error path**

1. With the dev server running, temporarily break the `SANITY_API_WRITE_TOKEN` in `.env.local` (set it to a bogus value).
2. Restart `pnpm dev`.
3. Submit the form normally.
4. Expected: error toast appears, no Sanity doc, no email.
5. Restore the real token and restart.

- [ ] **Step 6: Test the "email fails but Sanity succeeds" path**

Temporarily break the `RESEND_API_KEY` (set it to `"re_bogus"`) and submit. Expected: success toast, new Sanity doc, but no email. Check the dev console for `[enquiry] resend failed` to confirm the log line. Restore the real key.

- [ ] **Step 7: Final commit (only if any verification fixes were needed)**

If any step required a code change, commit it. Otherwise, no commit.

---

## Done

After Task 7 passes:

- `pnpm lint` and `pnpm build` are clean.
- The form persists every submission to Sanity.
- The team gets a Resend email for each one.
- Bots get a silent success.
- Editors can change form labels and interest options from the Studio without code changes.
