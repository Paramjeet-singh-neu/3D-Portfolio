import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Create a Sikh turban (Dastar) mesh
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "Turban";

  // Main turban dome - VERY large and prominent
  const domeGeometry = new THREE.SphereGeometry(0.6, 32, 24);
  domeGeometry.scale(1.4, 0.75, 1.4); // Make it much wider and flatter
  
  const domeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#5a4a7a"), // Rich purple-navy - lighter for visibility
    roughness: 0.65,
    metalness: 0.2,
    wireframe: false,
  });
  
  const dome = new THREE.Mesh(domeGeometry, domeMaterial);
  dome.position.set(0, 0.15, 0);
  dome.castShadow = true;
  dome.receiveShadow = true;
  turbanGroup.add(dome);

  // Turban base ring - large cylinder
  const baseGeometry = new THREE.CylinderGeometry(0.65, 0.65, 0.18, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3a2a6a"),
    roughness: 0.7,
    metalness: 0.15,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, -0.12, 0);
  base.castShadow = true;
  base.receiveShadow = true;
  turbanGroup.add(base);

  // Front peak - large and distinctive
  const peakGeometry = new THREE.ConeGeometry(0.28, 0.38, 16);
  const peakMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#6a5a8a"),
    roughness: 0.65,
    metalness: 0.2,
  });
  const peak = new THREE.Mesh(peakGeometry, peakMaterial);
  peak.position.set(0, 0.3, 0.28);
  peak.rotation.x = Math.PI * 0.3;
  peak.castShadow = true;
  peak.receiveShadow = true;
  turbanGroup.add(peak);

  // Prominent wrap bands - very visible cloth wrapping layers
  const wrapMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#7a6aaa"), // Much lighter purple for contrast
    roughness: 0.7,
    metalness: 0.15,
  });

  for (let i = 0; i < 8; i++) {
    const wrapGeometry = new THREE.CylinderGeometry(0.62, 0.62, 0.1, 32);
    const wrap = new THREE.Mesh(wrapGeometry, wrapMaterial);
    wrap.position.set(0, -0.15 + i * 0.1, 0);
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
            
            // Add turban directly to character group (not to bone, so it won't be affected by bone scaling)
            const turban = createTurban();
            // Position turban at roughly where the character's head is
            turban.position.set(0, 3.8, 0.2); // Height adjusted for character
            turban.scale.set(2, 2, 2); // Much larger scale
            character.add(turban);
            console.log("[v0] Turban added to character root at position:", turban.position, "scale:", turban.scale);

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
