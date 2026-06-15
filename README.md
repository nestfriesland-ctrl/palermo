# PALERMO — Tara Dijkstra

Personal website blueprint for **Tara Dijkstra — Combat & Conditioning** (martial arts + wellness).

> ⚠️ This is a **blueprint**. The imagery uses placeholder Unsplash photos of female martial artists — Tara replaces these with her own images later. Branding, copy, programs and prices are illustrative.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (dark, editorial theme — crimson accent)
- [iconify-icon](https://iconify.design/) web component for icons

## Local development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

- `src/App.jsx` — the full single-page app: navbar, hero, training gallery (marquee),
  philosophy, "The Method", interactive **Training Programs** catalog (filter/search/sort),
  program-details modal, slide-over booking drawer + checkout, footer. All scroll-reveal
  animations and interactive elements are intact from the original template.
- `src/index.css` — Tailwind directives, fonts, keyframe animations, texture overlay.
- `tailwind.config.js` — theme tokens (colors, font, easing).

## Deployment

Deployed on Vercel (framework: Vite). Domains: `tarapalermo.nl`, `www.tarapalermo.nl`.
