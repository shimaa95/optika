/**
 * Single source of truth for the Assistly chat embed. Edit values here when
 * the chatbot id changes, the assistly origin moves, or the brand logo
 * updates. The widget reads from this object in app/layout.tsx.
 */
export const ASSISTLY = {
  /** Assistly deployment that hosts /chatbot/[id]. */
  origin: "https://chatbots-smoky.vercel.app",
  /** Numeric chatbot id from the assistly admin dashboard. */
  chatbotId: 15,
  /** Logo used in the floating button and the chat header / messages. */
  logoUrl: "/Logo.svg",
  /** Primary color for the floating button. Chat header uses the assistly-side value. */
  primaryColor: "#4D7DFB",
} as const;
