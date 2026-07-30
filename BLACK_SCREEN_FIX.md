# Black screen fix

The portfolio is a Vite/React application. GitHub Pages must deploy the compiled `dist` directory, not the source branch.

## Required GitHub setting

1. Open repository Settings.
2. Open Pages.
3. Under Build and deployment, set Source to **GitHub Actions**.
4. Open Actions and run **Deploy AJAY NXT 3D Portfolio** if it does not start automatically.
5. Keep the custom domain as `3d.ajaynxt.com`.

The workflow file is:

`.github/workflows/deploy-pages.yml`

Do not select **Deploy from a branch** for this Vite source project.
