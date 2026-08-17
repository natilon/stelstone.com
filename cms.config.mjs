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


  // The landing's sections as named blocks. Design lives in
  // src/components/landing/*; these carry the words and the order. An editor
  // can rephrase, reorder — and if a section is deleted by mistake, every
  // publish is a commit: restore is a menu item.
  blocks: {
    "landing-hero": {
      label: "Landing — Hero",
      properties: {
        status: { type: "text", label: "Eyebrow" },
        title: { type: "text", label: "Title", required: true },
        lede: { type: "textarea", label: "Lede" },
        ctaDeploy: { type: "text", label: "Deploy CTA" },
        ctaSource: { type: "text", label: "Source CTA" },
      },
      defaults: { status: "", title: "", lede: "", ctaDeploy: "Deploy to Cloudflare", ctaSource: "Read the source" },
      toHtml: (p) => `<h1>${p.title ?? ""}</h1><p>${p.lede ?? ""}</p>`,
    },
    "landing-calls": {
      label: "Landing — Three calls",
      properties: {
        title: { type: "text", label: "Title" },
        sub: { type: "textarea", label: "Subtitle" },
        calls: { type: "object-list", label: "Calls",
          fields: [ { key: "quote", label: "Quote" }, { key: "body", label: "Answer" } ] },
      },
      defaults: { title: "", sub: "", calls: [] },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2>`,
    },
    "landing-rails": {
      label: "Landing — Guardrails",
      properties: {
        title: { type: "text", label: "Title" },
        sub: { type: "textarea", label: "Subtitle" },
        rails: { type: "object-list", label: "Guardrails",
          fields: [ { key: "title", label: "Title" }, { key: "body", label: "Body" } ] },
      },
      defaults: { title: "", sub: "", rails: [] },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2>`,
    },
    "landing-commit": {
      label: "Landing — Every publish is a commit",
      properties: {
        title: { type: "text", label: "Title" },
        body1: { type: "textarea", label: "Paragraph 1" },
        body2: { type: "textarea", label: "Paragraph 2" },
        testsLabel: { type: "text", label: "Tests stat label" },
      },
      defaults: { title: "", body1: "", body2: "", testsLabel: "" },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2><p>${p.body1 ?? ""}</p>`,
    },
    "landing-setup": {
      label: "Landing — Setup",
      properties: {
        title: { type: "text", label: "Title" },
        sub: { type: "textarea", label: "Subtitle" },
        loopBody: { type: "textarea", label: "Loop card body" },
      },
      defaults: { title: "", sub: "", loopBody: "" },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2>`,
    },
    "landing-production": {
      label: "Landing — In production",
      properties: {
        title: { type: "text", label: "Title" },
        cards: { type: "object-list", label: "Cards",
          fields: [
            { key: "kicker", label: "Kicker" },
            { key: "label", label: "Link label" },
            { key: "url", label: "URL (empty = plain text)" },
            { key: "note", label: "Note" },
          ] },
      },
      defaults: { title: "", cards: [] },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2>`,
    },
    "landing-migrate": {
      label: "Landing — Migration CTA",
      properties: {
        title: { type: "text", label: "Title" },
        body: { type: "textarea", label: "Body" },
        cta: { type: "text", label: "Primary CTA" },
        cta2: { type: "text", label: "Secondary CTA" },
      },
      defaults: { title: "", body: "", cta: "", cta2: "" },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2><p>${p.body ?? ""}</p>`,
    },
    "landing-ways": {
      label: "Landing — Three ways in",
      properties: {
        title: { type: "text", label: "Title" },
        ways: { type: "object-list", label: "Ways (open source, migration, cloud)",
          fields: [ { key: "title", label: "Title" }, { key: "body", label: "Body" }, { key: "linkLabel", label: "Link label" } ] },
      },
      defaults: { title: "", ways: [] },
      toHtml: (p) => `<h2>${p.title ?? ""}</h2>`,
    },
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
