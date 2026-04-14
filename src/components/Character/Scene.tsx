import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

// Create turban mesh
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "Turban";

  // Main turban dome
  const domeGeo = new THREE.SphereGeometry(0.22, 32, 24);
  domeGeo.scale(1.3, 0.8, 1.3);
  const domeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#5a4080"),
    roughness: 0.6,
    metalness: 0.2,
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.set(0, 0.12, 0);
  dome.castShadow = true;
  dome.receiveShadow = true;
  turbanGroup.add(dome);
  console.log("[v0] Dome added to turban");

  // Wrap bands
  const bandColors = ["#6a5090", "#7a60a0", "#8a70b0", "#9a80c0"];
  for (let i = 0; i < 4; i++) {
    const bandGeo = new THREE.TorusGeometry(0.24 - i * 0.02, 0.035, 8, 48);
    const bandMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(bandColors[i]),
      roughness: 0.65,
      metalness: 0.15,
    });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.02 + i * 0.06;
    band.castShadow = true;
    band.receiveShadow = true;
    turbanGroup.add(band);
  }
  console.log("[v0] Wrap bands added");

  // Front peak
  const peakGeo = new THREE.ConeGeometry(0.1, 0.18, 12);
  const peakMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#7a5eaa"),
    roughness: 0.6,
    metalness: 0.2,
  });
  const peak = new THREE.Mesh(peakGeo, peakMat);
  peak.position.set(0, 0.18, 0.12);
  peak.rotation.x = Math.PI * 0.3;
  peak.castShadow = true;
  peak.receiveShadow = true;
  turbanGroup.add(peak);
  console.log("[v0] Peak added. Total turban children:", turbanGroup.children.length);

  return turbanGroup;
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          
          // Add turban to headBone - needs to be much larger since headBone is small
          if (headBone) {
            const turban = createTurban();
            turban.position.set(0, 1.8, 0.2); // Much higher position
            turban.scale.set(12, 10, 12); // Much larger scale to be visible
            headBone.add(turban);
            console.log("[v0] Turban added - position:", turban.position, "scale:", turban.scale);
          }
          
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, character)
          );
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", (event) => {
        onMouseMove(event);
      });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, character!)
        );
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
