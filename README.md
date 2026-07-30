# AJAY NXT 3D Portfolio

A custom interactive portfolio for Ajay Saini / AJAY NXT.

## Why this codebase is original

- The hero sculpture is generated in code from Three.js geometry, materials and lights.
- No downloaded character, encrypted model, copied animation system or website screenshot is used.
- The layout, copy, interactions and responsive behaviour are written for AJAY NXT.
- Project covers use licensed real photographs. Sources are listed in `PHOTO_CREDITS.md`.

## Structure

```text
assets/
  css/styles.css
  js/
    data/site.js
    scene/PortfolioScene.js
    main.js
index.html
robots.txt
sitemap.xml
site.webmanifest
CNAME
```

## Technology

- Semantic HTML
- Modern CSS
- JavaScript ES modules
- Three.js r168, pinned to a fixed CDN version

There is no package installation or build step. The website can be served directly by GitHub Pages, which avoids the blank-page and dependency-install problems common with unbuilt Vite source uploads.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`.

The repository includes the custom-domain file:

```text
3d.ajaynxt.com
```

At the DNS provider, create:

```text
Type: CNAME
Host: 3d
Target: ajaynxt.github.io
```

In GitHub open **Settings → Pages** and select **GitHub Actions** under Build and deployment.

## SEO included

- Search-focused title and description
- Canonical URL
- Open Graph and Twitter preview image
- Person, ProfessionalService and WebSite structured data
- `robots.txt` and `sitemap.xml`
- Semantic headings, keyboard navigation and reduced-motion support
