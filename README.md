# Monis Rent

A deployable `Next.js` implementation of the `monis.rent` workspace configurator. The app lets users assemble a home office setup by selecting a desk, chair, and optional add-ons, then review the resulting monthly rental summary and proceed to a reserve state.

## Project Overview

This project focuses on turning a design handoff into a production-ready web app rather than a static mock. The implementation keeps the configurator flow lightweight, shareable, and easy to deploy, while preserving the key product interactions:

- choose a desk
- choose a chair
- toggle add-ons
- preview the setup live
- review a rental summary
- continue to a reserve screen

## Tech Stack

- `Next.js` App Router
- `React`
- `Tailwind CSS` with project-level global styling
- lightweight SVG rendering for the live preview

## Key Features

- interactive workspace builder
- URL-driven configuration state
- live isometric SVG preview
- rental summary with pricing breakdown
- reserve / confirmation page
- deployable on Vercel

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To verify the production build:

```bash
npm run build
```

## Architecture / Approach

I treated this as a design-to-product implementation. The main goal was to keep the experience stable and deployable while preserving the configurator interactions from the handoff.

The app uses URL-driven state for the selected desk, chair, and add-ons. This makes the builder easy to refresh, share, and test, and avoids relying on fragile local-only UI state. Shared pricing and configuration logic live in one place so the builder, summary, and reserve flow all derive from the same source of truth.

For the live preview, I used SVG instead of introducing a heavier rendering layer. That keeps the page lightweight, crisp at different sizes, and easier to control for this kind of product configurator.

## Tradeoffs

- The reserve flow is intentionally lightweight and does not persist reservations to a database.
- The builder prioritizes reliability and shareable state over a more complex client-side state architecture.
- The live preview is illustrative and controlled through SVG composition rather than a full 3D scene.

## What I’d Improve Next

Given more time, I would focus on:

1. stronger automated UI coverage for the builder and reserve flow
2. more responsive refinement across edge-case screen sizes
3. persistent backend handling for saved configurations or reservations
4. richer accessibility and keyboard interaction coverage

## Short Write-Up

I approached this as a product implementation, not just a design recreation. The key decision was to keep the configurator stable, deployable, and easy to reason about while preserving the core user flow. `Next.js` was a good fit because it gives a clean deployment path on Vercel, and URL-driven state makes the builder shareable and resilient across reloads.

The most important tradeoff was choosing simplicity and reliability over a more elaborate front-end state model. I also kept the visual preview in SVG so it stays lightweight and controllable without introducing unnecessary rendering complexity. With more time, I would invest in stronger automated QA, more responsive polish, and persistent reservation handling.
