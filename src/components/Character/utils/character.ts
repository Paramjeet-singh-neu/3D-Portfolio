import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Create a Sikh turban (Dastar) mesh
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "Turban";

  // Main turban body - larger dome
  const turbanGeometry = new THREE.SphereGeometry(0.25, 32, 24);
  // Scale to make it more turban-shaped (wider at bottom, rounded top)
  turbanGeometry.scale(1.2, 0.85, 1.2);
  
  const turbanMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2d1b3d"), // Deep purple-navy color for Sikh turban
    roughness: 0.7,
    metalness: 0.15,
    emissive: new THREE.Color("#1a0f2e"),
  });
  
  const turbanMain = new THREE.Mesh(turbanGeometry, turbanMaterial);
  turbanMain.position.set(0, 0.08, 0);
  turbanMain.castShadow = true;
  turbanMain.receiveShadow = true;
  turbanGroup.add(turbanMain);

  // Turban peak/front crest (the pointed front part)
  const peakGeometry = new THREE.ConeGeometry(0.12, 0.16, 16);
  const peakMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3d2a4d"),
    roughness: 0.7,
    metalness: 0.15,
  });
  const peak = new THREE.Mesh(peakGeometry, peakMaterial);
  peak.position.set(0, 0.15, 0.12);
  peak.rotation.x = Math.PI * 0.2;
  peak.castShadow = true;
  turbanGroup.add(peak);

  // Wrap bands around turban
  const wrapMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4a3a5a"),
    roughness: 0.75,
    metalness: 0.1,
  });

  for (let i = 0; i < 4; i++) {
    const wrapGeometry = new THREE.TorusGeometry(0.22 - i * 0.02, 0.032, 8, 32);
    const wrap = new THREE.Mesh(wrapGeometry, wrapMaterial);
    wrap.position.set(0, -0.02 + i * 0.045, 0);
    wrap.rotation.x = Math.PI / 2;
    wrap.castShadow = true;
    turbanGroup.add(wrap);
  }

  return turbanGroup;
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Change clothing colors to match site theme
                if (mesh.material) {
                  if (mesh.name === "BODY.SHIRT") { // The shirt mesh
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            // Add turban to head bone
            const headBone = character.getObjectByName("spine006"); // Head bone
            if (headBone) {
              const turban = createTurban();
              turban.position.set(0, 0.35, 0); // Position on top of head with more height
              turban.scale.set(1.3, 1.2, 1.3); // Larger scale for visibility
              headBone.add(turban);
              console.log("[v0] Turban added to head bone:", headBone.name, "Turban position:", turban.position);
            } else {
              console.log("[v0] Head bone (spine006) not found. Available bones:", character.children.map((c: any) => c.name));
            }

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
