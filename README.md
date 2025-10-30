# Anshuman Singh — Portfolio

Futuristic, animated portfolio built with React, Vite, TailwindCSS, Framer Motion, and react-three-fiber.

## Quick start
- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Tech
- React + Vite
- TailwindCSS (dark mode by default)
- Framer Motion (scroll reveals, transitions)
- React Three Fiber + drei (interactive starfield background)

## Structure
- `src/components`: UI sections
- `src/data/resumeData.js`: All content
- `src/animations/variants.js`: Motion variants
- `src/assets`: Images/logos (TODO)

## EmailJS setup
Create a `.env` in the project root with:
```
VITE_EMAILJS_SERVICE=your_service_id
VITE_EMAILJS_TEMPLATE=your_template_id
VITE_EMAILJS_PUBLIC=your_public_key
```
Configure the `Contact` component fields to match your EmailJS template.

## TODOs
- Replace assets in `src/assets` (profile photo, logos)
- Tweak Tailwind theme colors/accents in `tailwind.config.js`
- Add more 3D / particles effects if desired
