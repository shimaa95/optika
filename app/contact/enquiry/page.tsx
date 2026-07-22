import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { ENQUIRY_PAGE_QUERY } from '@/sanity/lib/queries'
import { EnquiryForm } from './enquiry-form'

export const dynamic = 'force-dynamic'

export default async function EnquiryFormPage() {
  const { data } = await sanityFetch({ query: ENQUIRY_PAGE_QUERY })

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

  // Defensive: the form's `EnquiryForm` filters out fields whose `name`
  // isn't one of `fullName | email | company | message` — so if the
  // editor leaves the `name` blank in Sanity (or sets it to the wrong
  // key), the field silently disappears. Infer the canonical key from
  // the position of the field in the array so the form keeps rendering
  // even with a half-populated Sanity document.
  const canonicalNameByPosition = ['fullName', 'email', 'company', 'message'] as const
  const normalizedFormFields = formFields.map((field: typeof fallbackFields[number], idx: number) => {
    const name =
      field.name && ['fullName', 'email', 'company', 'message'].includes(field.name)
        ? field.name
        : canonicalNameByPosition[idx] ?? field.name
    return { ...field, name }
  })
  const interestOptions =
    (data?.interestOptions?.length ?? 0) > 0
      ? data!.interestOptions
      : fallbackInterests
  const sideImageUrl = data?.sideImage?.asset?.url

  return (
    <section className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">
      <div className="bg-[#131313] text-white lg:w-1/2 flex flex-col justify-between pl-6 lg:pl-26 2xl:pl-50 pr-6 lg:pr-20 pt-3 pb-2 relative min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">
        <div className="max-w-[480px] w-full my-auto">
          <EnquiryForm
            formTitle={formTitle}
            introText={introText}
            submitButtonLabel={submitButtonLabel}
            copyrightText={copyrightText}
            formFields={normalizedFormFields}
            interestOptions={interestOptions}
          />
        </div>
      </div>

      <div className="relative h-[40vh] lg:h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] lg:sticky lg:top-[50px] xl:top-[75px] overflow-hidden shrink-0 lg:w-1/2">
        <div className="absolute inset-0">
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
      </div>
    </section>
  )
}
