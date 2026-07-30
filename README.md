# AJAY NXT 3D Portfolio

Interactive 3D portfolio for **Ajay Saini / AJAY NXT**, built with React, TypeScript, Three.js and GSAP.

## Portfolio identity

All editable business information is centralized in:

```text
src/config/site.ts
```

That file controls the owner name, brand, phone, email, social links, services, journey and project cards. The original animated hero structure and 3D character experience remain intact.

## Project visuals

The work carousel uses licensed real photographs, not pasted website screenshots. Source and licence information is included in `PHOTO_SOURCES_AND_LICENSES.txt`.

## Local development

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run preview
```

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys the `dist` directory whenever `main` is updated.

In the repository, select:

```text
Settings → Pages → Source → GitHub Actions
```

## Custom domain

In GitHub, open `Settings → Pages`, enter this under **Custom domain**, and save:

```text
3d.ajaynxt.com
```

Then create this DNS record at the domain provider:

```text
Type: CNAME
Host/Name: 3d
Target/Value: ajaynxt.github.io
```

## Licence

See `LICENSE` and `NOTICE.md`. The original MIT attribution is intentionally preserved.
