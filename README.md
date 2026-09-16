# Luvdeep Katyal — Cinematic 3D Portfolio

A production-style React + TypeScript + Three.js portfolio concept built around **CODE → SYSTEMS → SCALE → INTELLIGENCE**.

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Project structure

- `src/main.tsx` — application and interactive sections
- `src/styles.css` — visual system and responsive styling
- `src/data/content.ts` — editable portfolio content
- `public/assets/Luvdeep Katyal.jpeg` — supplied portrait
- `public/resume.pdf` — replace with your real PDF resume

## 3D interactions

The Engineering Core is built with React Three Fiber and Drei. The canvas supports orbit/zoom with bounded camera distance, auto-rotation, pointer response, hover-like technical nodes and architecture changes based on the selected engineering domain.

Project cards open an animated system modal. The Skills section switches the architecture shown in the 3D scene. The AI section presents a visual RAG pipeline.

## Customize

Edit `src/data/content.ts` to change:
- projects
- skills
- experience
- certifications
- social links

Replace `public/assets/Luvdeep Katyal.jpeg` with the final portrait. Replace `public/resume.pdf` with the actual resume PDF.

## Notes

The current package intentionally uses procedural Three.js geometry rather than external 3D model files, so it runs immediately without a model asset pipeline. For a final production deployment, replace placeholder social/email URLs and add the final resume PDF.
