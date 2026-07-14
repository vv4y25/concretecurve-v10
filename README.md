# Concrete Curve Magazine

Independent magazine gallery for Concrete Curve — three browseable issues with an accessible full-screen page viewer.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Adding real magazine images

See [public/images/README.md](public/images/README.md) for the stable path convention. Until covers and page scans are present, SVG placeholders are shown automatically.

## Editorial note

Homepage and issue copy in `lib/issues.ts` and `lib/site.ts` is placeholder pending editorial approval. Replace before publishing, and set `site.url` to the production domain.
