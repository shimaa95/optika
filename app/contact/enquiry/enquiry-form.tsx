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

const FIXED_FIELD_KEYS = ['fullName', 'email', 'company', 'message']

function renderField(
  field: FormField,
  inputClass: string,
  textareaClass: string
) {
  // Skip fields whose name is unknown — keeps the server-validated
  // shape stable even if an editor leaves a stale entry.
  if (!FIXED_FIELD_KEYS.includes(field.name)) {
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
