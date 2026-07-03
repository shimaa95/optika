/**
 * Decorative background layer for the Optika landing page.
 *
 * Uses bfdecor.svg — a single vector that contains both the top-right
 * and bottom-left gradient shapes in one asset.
 */
export function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden "
    >
      <img
        src="/bfdecor.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}
