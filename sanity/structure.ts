import type {StructureResolver} from 'sanity/structure'

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(type).documentId(type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'homePage', 'Home Page'),
      singleton(S, 'aboutPage', 'About Page'),
      singleton(S, 'solutionsPage', 'Solutions Page'),
      singleton(S, 'sharedSolutionsGrid', 'Shared Solutions Grid'),
      singleton(S, 'sharedFooter', 'Shared Footer'),
      S.divider(),

      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items([
              singleton(S, 'productsPage', 'Products Overview'),
              singleton(S, 'singleVisionPage', 'Single Vision Page'),
              singleton(S, 'transitionPage', 'Transition Page'),
              S.listItem()
                .title('ACUTUS Overview')
                .child(
                  S.document()
                    .schemaType('acutusPage')
                    .documentId('acutusPage'),
                ),
              S.listItem()
                .title('ACUTUS Products')
                .child(
                  S.documentTypeList('acutusProduct')
                    .title('ACUTUS Products')
                    .defaultOrdering([{ field: 'sequenceNumber', direction: 'asc' }]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Contact')
        .child(
          S.list()
            .title('Contact')
            .items([
              singleton(S, 'contactPage', 'Contact Page'),
              singleton(S, 'enquiryPage', 'Enquiry Page'),
            ]),
        ),
      S.divider(),
      singleton(S, 'termsPage', 'Terms Page'),
      singleton(S, 'privacyPolicyPage', 'Privacy Policy Page'),
    ])
