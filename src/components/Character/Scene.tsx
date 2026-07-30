import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import setAnimations from "./utils/animationUtils";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import {
  handleHeadRotation,
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";
import handleResize from "./utils/resizeUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const mount = canvasDiv.current;
    if (!mount) return;

    const scene = sceneRef.current;
    const bounds = mount.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(bounds.width, bounds.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      14.5,
      bounds.width / bounds.height,
      0.1,
      1000
    );
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress(setLoading);
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    let disposed = false;
    let frameId = 0;
    let mixer: THREE.AnimationMixer | undefined;
    let character: THREE.Object3D | undefined;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let resizeHandler: (() => void) | undefined;
    let removeHoverListeners: (() => void) | undefined;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landing = document.getElementById("landingDiv");
    landing?.addEventListener("touchmove", onTouchMove, { passive: true });
    landing?.addEventListener("touchend", onTouchEnd);

    loadCharacter()
      .then((gltf) => {
        if (!gltf || disposed) return;

        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          removeHoverListeners = animations.hover(gltf, hoverDivRef.current);
        }

        mixer = animations.mixer;
        character = gltf.scene;
        scene.add(character);
        headBone = character.getObjectByName("spine006");
        screenLight = character.getObjectByName("screenlight");

        resizeHandler = () => {
          if (character) handleResize(renderer, camera, canvasDiv, character);
        };
        window.addEventListener("resize", resizeHandler);

        progress.loaded().then(() => {
          if (disposed) return;
          window.setTimeout(() => {
            if (disposed) return;
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
      })
      .catch((error) => {
        console.error("Unable to load the 3D character scene.", error);
        progress.clear();
      });

    const renderFrame = () => {
      frameId = requestAnimationFrame(renderFrame);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        if (screenLight) light.setPointLight(screenLight);
      }

      mixer?.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    renderFrame();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      landing?.removeEventListener("touchmove", onTouchMove);
      landing?.removeEventListener("touchend", onTouchEnd);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);

      removeHoverListeners?.();
      mixer?.stopAllAction();
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [setLoading]);

  return (
    <div className="character-container" aria-hidden="true">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
