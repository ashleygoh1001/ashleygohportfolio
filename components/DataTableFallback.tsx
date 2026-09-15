import type { Strand } from "@/lib/types";
import { categoryLabels } from "@/lib/tokens";

type Props = {
  strands: Strand[];
};

export function DataTableFallback({ strands }: Props) {
  return (
    <div className="sr-only">
      <table>
        <caption>
          Life data strands from 2011 to present, organized by category and
          connected to professional capabilities.
        </caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Label</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Intensity</th>
            <th scope="col">Leads to</th>
          </tr>
        </thead>
        <tbody>
          {strands.map((s) => (
            <tr key={s.id}>
              <td>{categoryLabels[s.category]}</td>
              <td>{s.label}</td>
              <td>{s.start}</td>
              <td>{s.end ?? "—"}</td>
              <td>{Math.round(s.weight * 100)}%</td>
              <td>{s.leadsTo.join(", ") || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
