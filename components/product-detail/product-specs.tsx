import { AnimateInView } from "@/components/product-detail/animate-in-view"
import type { ProductDetailData } from "@/lib/products/product-detail"
import { cn } from "@/lib/utils"

interface ProductSpecsProps {
  specs: ProductDetailData["specs"]
  whyTitle: string
  whyPoints: string[]
  themeColor: string
}

export function ProductSpecs({
  specs,
  whyTitle,
  whyPoints,
  themeColor,
}: ProductSpecsProps) {
  return (
    <AnimateInView delay={0.1} className="flex flex-1 flex-col">
      <div className="w-full overflow-hidden border border-neutral-200">
        <table className="w-full border-collapse text-left text-[13px] sm:text-[14px]">
          <tbody>
            {specs.map((row) => (
              <tr
                key={row.label}
                className={
                  row.variant === "green" ? "text-white" :
                    row.variant === "gray" ? "bg-table-gray text-text-dark" :
                      "bg-bg-light text-text-dark"
                }
                style={row.variant === "green" ? { backgroundColor: themeColor } : {}}
              >
                <th
                  scope="row"
                  className={cn(
                    "w-[42%] px-4 py-3 font-semibold sm:px-5 sm:py-3.5",
                    row.variant === "green"
                      ? "border-r border-white/15"
                      : "border-r border-neutral-200",
                  )}
                >
                  {row.label}
                </th>
                <td className="px-4 py-3 font-normal sm:px-5 sm:py-3.5">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 sm:mt-12">
        <h3 className="text-[15px] font-bold text-text-dark sm:text-[20px]">
          {whyTitle}
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-[1.5] text-text-dark sm:text-[15px]">
          {whyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </AnimateInView>
  )
}
