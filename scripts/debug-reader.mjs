import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";

async function main() {
  const r = createReader(process.cwd(), config);
  const all = await r.collections.projects.all();
  console.log("count", all.length, all.map((p) => p.slug));
  for (const slug of ["build-a-box", "dartmouth-dining-uxr"]) {
    try {
      const p = await r.collections.projects.read(slug);
      console.log(slug, p ? "ok" : "null", p?.title);
    } catch (e) {
      console.log(slug, "error", e);
    }
  }
}

main();
