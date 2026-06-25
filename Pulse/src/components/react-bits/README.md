# React Bits adapters

React Bits components should be copied or wrapped here before use in product sections.

Rules:

- Do not import React Bits implementations directly from section files.
- Keep component-specific animation defaults in adapter files.
- Respect `prefers-reduced-motion` in every adapter.
- Disable expensive pointer effects on touch-first/mobile contexts when needed.
- Export public adapters from `index.ts` only after the concrete component is added.

No visual React Bits components are implemented yet; this folder is prepared for the foundation phase.
