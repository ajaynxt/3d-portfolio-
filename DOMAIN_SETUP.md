# Connect `3d.ajaynxt.com`

The deployment workflow uses GitHub Actions. After the files are on the `main` branch:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Under **Custom domain**, enter `3d.ajaynxt.com` and save.
5. At the DNS provider for `ajaynxt.com`, add:

```text
Type: CNAME
Name/Host: 3d
Target/Value: ajaynxt.github.io
```

6. Return to GitHub Pages settings and enable **Enforce HTTPS** after it becomes available.

The CNAME target must not include `/3d-portfolio-/`.
