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
    // The GitHub backend lists entries from per-collection _index.json
    // manifests. "lazy" bootstraps a missing manifest with one GraphQL call
    // and persists it — without this, the admin shows collections with
    // EMPTY entry lists until a build-index CLI run. Right default for
    // small sites; big collections should ship prebuilt indexes instead.
    list: { rebuild: "lazy" },
  },

  auth: {
    provider: "basic",
    users: [{ user: "admin", passEnv: "ADMIN_PASS", role: "admin" }],
  },

  collections: {
    // The landing's COPY, not its layout: index.astro owns the structure and
    // design; this record carries only the words. An editor can rephrase the
    // hero in 30 seconds and cannot break the page — the site lives its own
    // pitch. One record per language (en-landing, tr-landing).
    landing: {
      label: "Landing copy",
      listFields: [{ key: "title" }, { key: "lang" }],
      metaFields: [
        { key: "title", label: "Record name", type: "text", required: true },
        { key: "status", label: "Hero eyebrow", type: "text" },
        { key: "heroTitle", label: "Hero title", type: "text", required: true },
        { key: "heroLede", label: "Hero lede", type: "textarea", required: true },
        { key: "ctaDeploy", label: "CTA — deploy button", type: "text" },
        { key: "ctaSource", label: "CTA — source button", type: "text" },
        { key: "callsTitle", label: "Calls — title", type: "text" },
        { key: "callsSub", label: "Calls — subtitle", type: "textarea" },
        { key: "calls", label: "Calls (3)", type: "object-list",
          fields: [ { key: "quote", label: "Quote" }, { key: "body", label: "Answer" } ] },
        { key: "railsTitle", label: "Guardrails — title", type: "text" },
        { key: "railsSub", label: "Guardrails — subtitle", type: "textarea" },
        { key: "rails", label: "Guardrails (6)", type: "object-list",
          fields: [ { key: "title", label: "Title" }, { key: "body", label: "Body" } ] },
        { key: "commitTitle", label: "Commit — title", type: "text" },
        { key: "commitBody1", label: "Commit — paragraph 1", type: "textarea" },
        { key: "commitBody2", label: "Commit — paragraph 2", type: "textarea" },
        { key: "testsLabel", label: "Tests stat label", type: "text" },
        { key: "setupTitle", label: "Setup — title", type: "text" },
        { key: "setupSub", label: "Setup — subtitle", type: "textarea" },
        { key: "loopBody", label: "Setup — loop card body", type: "textarea" },
        { key: "prodTitle", label: "Production — title", type: "text" },
        { key: "migrateTitle", label: "Migration — title", type: "text" },
        { key: "migrateBody", label: "Migration — body", type: "textarea" },
        { key: "migrateCta", label: "Migration — primary CTA", type: "text" },
        { key: "migrateCta2", label: "Migration — secondary CTA", type: "text" },
        { key: "waysTitle", label: "Ways — title", type: "text" },
        { key: "ways", label: "Ways (3: open source, migration, cloud)", type: "object-list",
          fields: [ { key: "title", label: "Title" }, { key: "body", label: "Body" }, { key: "linkLabel", label: "Link label" } ] },
        { key: "footerStory", label: "Footer — name story", type: "textarea" },
      ],
    },
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
