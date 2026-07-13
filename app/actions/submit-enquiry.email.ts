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
