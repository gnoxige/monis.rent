# Monis Rent

This repository now ports the provided Claude Design ZIP into a deployable `Next.js` + `Tailwind CSS` app using the App Router.

## What was implemented

- The real `monis.rent` workspace configurator from the ZIP handoff
- Interactive desk, chair, and add-on selection
- Live isometric SVG workspace preview
- Rental summary and confirmation modal

## Source bundle used

The public handoff URL returned `HTTP 404`, so the implementation was based on the exported ZIP bundle you provided locally:

- `/Users/rizaldipratama/Downloads/monis.rent.zip`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Push to a public GitHub repo

1. Create a new public repository on GitHub.
2. Run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Deploy to Vercel

1. Go to `https://vercel.com/new`
2. Import your GitHub repository.
3. Keep the default framework settings for `Next.js`.
4. Click **Deploy**.

## If you want the real design implemented

If you want me to finish the full publish flow too, I can do that once GitHub authentication works locally or if you give me your repo URL after creating it.
