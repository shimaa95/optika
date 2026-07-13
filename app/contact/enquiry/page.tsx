import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { ENQUIRY_PAGE_QUERY } from '@/sanity/lib/queries'
import { EnquiryForm } from './enquiry-form'

export const dynamic = 'force-dynamic'

export default async function EnquiryFormPage() {
  const data = await client.fetch(ENQUIRY_PAGE_QUERY, {}, { next: { revalidate: 60 } })

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
  const formFields =
    (data?.formFields?.length ?? 0) > 0 ? data!.formFields : fallbackFields
  const interestOptions =
    (data?.interestOptions?.length ?? 0) > 0
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
