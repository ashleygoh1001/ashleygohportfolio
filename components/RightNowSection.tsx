import mindData from "@/data/mind.json";
import type { Strand } from "@/lib/types";
import { categoryColors } from "@/lib/tokens";

const mind = mindData as Strand[];
const current = mind.slice(-4).reverse();

export function RightNowSection() {
  return (
    <section className="border-t border-hairline px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="display mb-6 text-xl text-paper md:text-2xl">
          Right now
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {current.map((item) => (
            <li
              key={item.id}
              className="border-l-2 bg-ground px-4 py-3"
              style={{ borderColor: categoryColors.mind }}
            >
              <span className="text-base text-paper">{item.label}</span>
              <span className="mt-1 block text-sm text-muted">
                {String(item.detail.status ?? "Exploring")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
