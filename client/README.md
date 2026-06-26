# JMD Digital Library — Frontend (client)

This README documents how to build, preview, and deploy the `client` frontend (Vite + React) to Vercel.

Prerequisites
- Node 18+ and npm installed

Quick local commands (from the `client` folder)

```bash
npm install
npm run dev      # local dev server
npm run build    # produce production build in `dist/`
npm run preview  # preview built site locally
```

Build output
- The production build is output to `dist/` (Vite default). The project includes `vercel.json` which configures Vercel to use `dist`.

Vercel deployment

1. In the Vercel Dashboard, create a new Project and point the Root to the `client` folder (Project Root: `client`).
2. Ensure Build Command is `npm run build` and Output Directory is `dist` (the included `vercel.json` already does this when deploying from `client`).
3. Add environment variables under Settings → Environment Variables:
   - `VITE_BASE_URL`: set to your production API URL (example: `https://api.example.com/api`).
4. Deploy via the Dashboard or CLI.

Deploy via CLI (from the `client` folder)

```bash
npx vercel login
npx vercel --prod
# or add env via CLI:
npx vercel env add VITE_BASE_URL production
```

Notes & checklist
- `vercel.json` contains a SPA rewrite to `index.html` — good for single-page routing.
- Make sure your backend accepts requests from the deployed frontend domain (CORS). If your backend is separate, add the Vercel domain as an allowed origin.
- Replace the `VITE_BASE_URL` value in Vercel envs (do not leave the local `client/.env` value for production).

Troubleshooting
- If build fails, run `npm run build` locally and inspect the output. Common issues: missing env vars, incompatible Node version, or unmet peer dependencies.

If you want, I can: deploy the `client` to Vercel for you via the CLI, or add a GitHub Action to auto-deploy on push — tell me which.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
