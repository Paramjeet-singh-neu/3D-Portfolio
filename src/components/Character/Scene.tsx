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

// Create authentic Punjabi turban (Pagg) with cloth folds
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "PunjabiPagg";

  // Traditional deep navy blue colors
  const baseColor = new THREE.Color("#0d1b3e");
  const foldDark = new THREE.Color("#162955");
  const foldLight = new THREE.Color("#1e3a6e");

  // Base foundation cylinder
  const baseGeo = new THREE.CylinderGeometry(0.19, 0.21, 0.06, 32);
  const baseMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.8 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.02;
  turbanGroup.add(base);

  // Main dome body
  const domeGeo = new THREE.SphereGeometry(0.18, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.55);
  domeGeo.scale(1.05, 0.85, 1.05);
  const domeMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.75 });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 0.01;
  turbanGroup.add(dome);

  // Horizontal cloth fold wraps - the distinctive wrapped layers
  for (let i = 0; i < 8; i++) {
    const radius = 0.175 - i * 0.006;
    const foldGeo = new THREE.TorusGeometry(radius, 0.014, 6, 64);
    const foldMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? foldDark : foldLight,
      roughness: 0.85,
    });
    const fold = new THREE.Mesh(foldGeo, foldMat);
    fold.rotation.x = Math.PI / 2;
    fold.position.y = 0.01 + i * 0.018;
    turbanGroup.add(fold);
  }

  // Vertical pleats around the turban showing wrapped fabric
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const pleatGeo = new THREE.BoxGeometry(0.008, 0.13, 0.022);
    const pleatMat = new THREE.MeshStandardMaterial({ color: foldDark, roughness: 0.9 });
    const pleat = new THREE.Mesh(pleatGeo, pleatMat);
    pleat.position.set(Math.sin(angle) * 0.165, 0.065, Math.cos(angle) * 0.165);
    pleat.rotation.y = angle;
    turbanGroup.add(pleat);
  }

  // Top center piece
  const topGeo = new THREE.SphereGeometry(0.035, 16, 12);
  topGeo.scale(1, 0.5, 1);
  const topMat = new THREE.MeshStandardMaterial({ color: foldLight, roughness: 0.7 });
  const topKnot = new THREE.Mesh(topGeo, topMat);
  topKnot.position.y = 0.145;
  turbanGroup.add(topKnot);

  // Front fan/puff - the distinctive peaked front of Punjabi turban
  const fanShape = new THREE.Shape();
  fanShape.moveTo(0, 0);
  fanShape.quadraticCurveTo(0.06, 0.04, 0.04, 0.09);
  fanShape.quadraticCurveTo(0, 0.11, -0.04, 0.09);
  fanShape.quadraticCurveTo(-0.06, 0.04, 0, 0);
  const fanGeo = new THREE.ExtrudeGeometry(fanShape, { depth: 0.03, bevelEnabled: false });
  const fanMat = new THREE.MeshStandardMaterial({ color: foldLight, roughness: 0.75 });
  const fan = new THREE.Mesh(fanGeo, fanMat);
  fan.position.set(0, 0.06, 0.16);
  fan.rotation.x = -0.2;
  turbanGroup.add(fan);

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
          
          // Add Punjabi turban to headBone
          if (headBone) {
            const turban = createTurban();
            turban.position.set(0, 1.4, 0.1);
            turban.scale.set(8, 7, 8);
            headBone.add(turban);
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
