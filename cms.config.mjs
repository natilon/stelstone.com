/**
 * stelstone.com's own content model. The marketing landing is code
 * (src/pages/index.astro); CMS-managed pages (docs, blog, legal) join the
 * `pages` collection as they're written — this site eats its own dog food.
 */
export default {
  locales: ["en"],
  defaultLocale: "en",

  content: {
    provider: process.env.GITHUB_CONTENT === "true" ? "github" : "fs",
    githubTokenEnv: "GITHUB_TOKEN",
    // Auto-detected from the git remote at build time (worker/repo.json);
    // fill in only if content lives in a different repository.
    owner: "REPLACE_GITHUB_OWNER",
    repo: "REPLACE_GITHUB_REPO",
    branch: "main",
    draftBranch: "cms-drafts",
    pagesDir: "src/pages-data",
    assetsDir: "public/images",
    publishBranch: "main",
    publishPaths: ["src/pages-data"],
    commitMessage: (ts) => `Content update ${ts}`,
  },

  auth: {
    provider: "basic",
    users: [{ user: "admin", passEnv: "ADMIN_PASS", role: "admin" }],
  },

  collections: {
    pages: {
      label: "Pages",
      listFields: [{ key: "title" }, { key: "slug" }],
      metaFields: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "parent", label: "Parent page (slug)", type: "text" },
        { key: "redirectFrom", label: "Old paths (301 here)", type: "string-list" },
      ],
      sort: { field: "title", direction: "asc" },
    },
  },
};
