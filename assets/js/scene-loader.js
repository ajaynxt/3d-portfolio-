const canvasHost = document.querySelector("[data-scene]");

if (canvasHost) {
  import("./scene/PortfolioScene.js")
    .then(({ PortfolioScene }) => {
      const scene = new PortfolioScene(canvasHost);
      canvasHost.classList.add("scene-ready");
      window.addEventListener("pagehide", () => scene.dispose(), { once: true });
    })
    .catch((error) => {
      canvasHost.classList.add("scene-fallback");
      console.warn(
        "The 3D enhancement could not load. Core content is still available.",
        error,
      );
    });
}
