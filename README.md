# tingcccc Portfolio

React + Vite static portfolio. **No backend required** for the current features — ideal for AWS Amplify Hosting.

## Local development

```bash
npm install
npm run dev
```

## Customize

| What | Where |
|------|--------|
| Typing taglines | `src/data/typingLines.ts` |
| Carousel images | `public/carousel/` + `src/data/carousel.json` |
| Quotes (daily rotation) | `src/data/quotes.json` |
| Work / projects section | `src/sections/WorkSection.tsx` |

## Deploy to Amplify Hosting

1. Push this repo to GitHub (or connect your Git provider).
2. In Amplify Console → **Host web app** → connect the repo.
3. **App root** must be empty (repo root). Do **not** use `portfolio-app` — the app was moved to the repository root.
4. Amplify reads `amplify.yml` at the repo root — build output is `dist/`.
5. Node **22** is required (see `.nvmrc`). Amplify runs `nvm use 22` in `amplify.yml`.

If a build fails after the restructure, open the failed build log and check for `package.json` not found (wrong app root) or Node/Vite errors (upgrade Node to 22 in build settings).

## When you might want AWS backend later

Not needed now. Consider it only if you add:

- Contact form with email delivery
- Admin UI to edit quotes/projects without redeploying
- User accounts or a blog CMS
- Server-side analytics beyond Amplify’s built-in metrics

Options: API Gateway + Lambda, Amplify Data (AppSync/DynamoDB), or keep content in Git and redeploy (simplest).
