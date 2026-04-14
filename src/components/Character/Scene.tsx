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

// Create authentic black Punjabi Pagg with smooth dome and diagonal cloth folds
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "PunjabiPagg";

  // Black color palette matching the reference photo
  const blackMain = new THREE.Color("#1a1a1a");
  const blackFold = new THREE.Color("#252525");
  const blackHighlight = new THREE.Color("#333333");

  // Main turban dome - smooth rounded shape
  const domeGeo = new THREE.SphereGeometry(0.22, 48, 32);
  domeGeo.scale(1.0, 0.75, 1.0); // Slightly flattened dome
  const domeMat = new THREE.MeshStandardMaterial({
    color: blackMain,
    roughness: 0.85,
    metalness: 0.05,
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 0.08;
  turbanGroup.add(dome);

  // Lower band/base that sits on head
  const baseGeo = new THREE.CylinderGeometry(0.21, 0.22, 0.06, 48);
  const baseMat = new THREE.MeshStandardMaterial({
    color: blackMain,
    roughness: 0.85,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.02;
  turbanGroup.add(base);

  // Diagonal cloth fold lines - the characteristic wrapped look
  // These go diagonally across the turban surface
  for (let i = 0; i < 10; i++) {
    // Create diagonal fold using thin curved cylinders
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.2, 0.02 + i * 0.014, 0.08),
      new THREE.Vector3(0, 0.06 + i * 0.012, 0.22),
      new THREE.Vector3(0.2, 0.02 + i * 0.014, 0.08)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.008, 6, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? blackFold : blackHighlight,
      roughness: 0.9,
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    turbanGroup.add(tube);
  }

  // Back diagonal folds
  for (let i = 0; i < 8; i++) {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.18, 0.03 + i * 0.015, -0.1),
      new THREE.Vector3(0, 0.07 + i * 0.012, -0.2),
      new THREE.Vector3(0.18, 0.03 + i * 0.015, -0.1)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.007, 6, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: blackFold,
      roughness: 0.9,
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    turbanGroup.add(tube);
  }

  // Side wrapping folds - left side
  for (let i = 0; i < 6; i++) {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.2, 0.03 + i * 0.018, 0),
      new THREE.Vector3(-0.22, 0.08 + i * 0.012, 0),
      new THREE.Vector3(-0.18, 0.14, 0)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.006, 6, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color: blackFold, roughness: 0.9 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    turbanGroup.add(tube);
  }

  // Side wrapping folds - right side
  for (let i = 0; i < 6; i++) {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.2, 0.03 + i * 0.018, 0),
      new THREE.Vector3(0.22, 0.08 + i * 0.012, 0),
      new THREE.Vector3(0.18, 0.14, 0)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.006, 6, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color: blackFold, roughness: 0.9 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    turbanGroup.add(tube);
  }

  // Top smoothing cap
  const topGeo = new THREE.SphereGeometry(0.12, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const topMat = new THREE.MeshStandardMaterial({
    color: blackMain,
    roughness: 0.85,
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 0.14;
  turbanGroup.add(top);

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
            turban.position.set(0, 1.2, 0);
            turban.scale.set(6, 5.5, 6);
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
