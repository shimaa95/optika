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
  message: z.string().min(1).max(5000),
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
