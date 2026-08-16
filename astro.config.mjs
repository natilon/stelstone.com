import { defineConfig } from "astro/config";
import stelstone, {
  collectRedirects,
  hierarchicalPathOf,
  workerRedirects,
  readContentDirs,
} from "stelstone";
import cmsConfig from "./cms.config.mjs";

// CMS-managed pages get generated redirects like every Stelstone site; the
// landing itself is code and doesn't participate. Served by the worker
// (worker/redirects.json), so they are NOT passed to Astro's `redirects`.
const docs = readContentDirs("src/pages-data/pages");
const { redirects, problems } = collectRedirects({
  source: docs,
  pathOf: hierarchicalPathOf(docs),
});
for (const p of problems) console.warn(`[redirects] ${p}`);

export default defineConfig({
  site: "https://stelstone.com",
  integrations: [stelstone({ config: cmsConfig }), workerRedirects(redirects)],
});
