import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Create a Sikh turban (Dastar) mesh
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "Turban";

  // Main turban dome - large and prominent
  const domeGeometry = new THREE.SphereGeometry(0.35, 32, 24);
  domeGeometry.scale(1.3, 0.8, 1.3); // Make it wider and flatter
  
  const domeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3d2d5a"), // Rich purple-navy
    roughness: 0.65,
    metalness: 0.2,
    wireframe: false,
  });
  
  const dome = new THREE.Mesh(domeGeometry, domeMaterial);
  dome.position.set(0, 0.1, 0);
  dome.castShadow = true;
  dome.receiveShadow = true;
  turbanGroup.add(dome);

  // Turban base ring
  const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.12, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2a1a4a"),
    roughness: 0.7,
    metalness: 0.15,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, -0.08, 0);
  base.castShadow = true;
  base.receiveShadow = true;
  turbanGroup.add(base);

  // Front peak - the distinctive upright part
  const peakGeometry = new THREE.ConeGeometry(0.18, 0.25, 16);
  const peakMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4d3d6a"),
    roughness: 0.65,
    metalness: 0.2,
  });
  const peak = new THREE.Mesh(peakGeometry, peakMaterial);
  peak.position.set(0, 0.2, 0.18);
  peak.rotation.x = Math.PI * 0.3;
  peak.castShadow = true;
  peak.receiveShadow = true;
  turbanGroup.add(peak);

  // Prominent wrap bands - cloth wrapping layers
  const wrapMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#5a4a7a"), // Lighter purple for wrap bands
    roughness: 0.7,
    metalness: 0.15,
  });

  for (let i = 0; i < 6; i++) {
    const wrapGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 32);
    const wrap = new THREE.Mesh(wrapGeometry, wrapMaterial);
    wrap.position.set(0, -0.08 + i * 0.08, 0);
    wrap.castShadow = true;
    wrap.receiveShadow = true;
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
            // Collect all mesh names for debugging
            const meshNames: string[] = [];
            
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                meshNames.push(mesh.name);

                // Hide the cap/hat mesh - check various possible names
                const capNames = ["cap", "hat", "Cap", "Hat", "CAP", "HAT", "headwear", "Headwear", "baseball", "Baseball"];
                const isCapMesh = capNames.some(name => mesh.name.toLowerCase().includes(name.toLowerCase()));
                
                if (isCapMesh) {
                  mesh.visible = false;
                  console.log("[v0] Hidden cap mesh:", mesh.name);
                }

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
            
            console.log("[v0] All mesh names in character:", meshNames);
            
            // Add turban to head bone
            const headBone = character.getObjectByName("spine006"); // Head bone
            if (headBone) {
              const turban = createTurban();
              turban.position.set(0, 0.4, 0); // Position higher on head
              turban.scale.set(1.5, 1.4, 1.5); // Much larger scale for prominent visibility
              headBone.add(turban);
              console.log("[v0] Turban added to head bone - scale:", turban.scale);
            } else {
              console.log("[v0] Head bone (spine006) not found. Trying alternative bones...");
              // Try to find any bone with "head" in the name
              let foundHead = false;
              character.traverse((child: any) => {
                if (!foundHead && child.isBone && child.name.toLowerCase().includes("head")) {
                  const turban = createTurban();
                  turban.position.set(0, 0.4, 0);
                  turban.scale.set(1.5, 1.4, 1.5);
                  child.add(turban);
                  console.log("[v0] Turban added to alternative head bone:", child.name);
                  foundHead = true;
                }
              });
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
