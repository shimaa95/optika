# Sanity Content Seeder

One-shot Node script that uploads the project's `/public/` images to
Sanity and writes `homePage` + `aboutPage` documents with the
hardcoded React component content.

## Why

The `homePage` and `aboutPage` schemas exist in Sanity, but the
documents are empty. This script populates them with the same content
the React components render today, so the hosted Studio at
https://optika.sanity.studio/ has real data to display.

The React components do NOT change. They still render hardcoded
content. A follow-up will wire the components to the data.

## How to run

1. Create a write token at
   https://sanity.io/manage/project/mg9t164n/api#tokens
   - Name: `seed-content`
   - Permissions: **Editor** (or Administrator if Editor is not enough)
   - Save the token — it is shown only once.

2. Run the seeder:

   ```bash
   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content
   ```

   The script prints a diff summary and asks for confirmation. Pass
   `--force` to skip the prompt:

   ```bash
   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content --force
   ```

3. Open https://optika.sanity.studio/ and verify both "Home Page" and
   "About Page" documents have content.

## Idempotency

Re-running the script overwrites both documents with the same `_id`s.
Images already uploaded to Sanity are cached in
`.sanity-asset-cache.json` (gitignored) and not re-uploaded.

To force a fresh upload, delete `.sanity-asset-cache.json` before
running.

## Test

```bash
node scripts/seed-content.test.mjs
```

Validates the payload shapes without making any network calls.

## Token storage

The script reads `SANITY_API_WRITE_TOKEN` from the **shell
environment only**, never from `.env.local`. The frontend's
`NEXT_PUBLIC_*` vars are read from `.env.local` as usual.

Do not commit the write token to git.
