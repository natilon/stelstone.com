# stelstone.com

The Stelstone landing — built with Stelstone itself, served by one Cloudflare
Worker (site + `/admin` + API). The marketing page is code
(`src/pages/index.astro`, implementing the "Stelstone Landing A" design);
CMS-managed pages join the `pages` collection as they're written.

```bash
npm install
cp .env.example .env    # set ADMIN_PASS
npm run dev             # site + /admin on one origin
npm run preview         # build + run the real worker locally
npm run deploy          # build + deploy (run from the Stelstone CF account)
```

Secrets on the worker: `GITHUB_TOKEN` (Contents read/write on this repo),
`ADMIN_PASS`. Custom domain: attach `stelstone.com` to the worker in the
Cloudflare dashboard.
