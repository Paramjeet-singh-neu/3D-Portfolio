import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Create a Sikh turban (Dastar) mesh - using simple, visible geometries
const createTurban = () => {
  const turbanGroup = new THREE.Group();
  turbanGroup.name = "Turban";

  // Turban body - using LatheGeometry for a traditional turban dome shape
  const points = [];
  points.push(new THREE.Vector2(0.0, 0.0));
  points.push(new THREE.Vector2(0.5, 0.0));
  points.push(new THREE.Vector2(0.6, 0.2));
  points.push(new THREE.Vector2(0.55, 0.4));
  points.push(new THREE.Vector2(0.3, 0.5));
  points.push(new THREE.Vector2(0.0, 0.5));
  
  const latheGeometry = new THREE.LatheGeometry(points, 32);
  const turbMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#6b4e99"), // Bright purple
    roughness: 0.6,
    metalness: 0.25,
    side: THREE.DoubleSide,
  });
  
  const lathe = new THREE.Mesh(latheGeometry, turbMaterial);
  lathe.scale.set(1.2, 1.0, 1.2);
  lathe.castShadow = true;
  lathe.receiveShadow = true;
  turbanGroup.add(lathe);

  // Wrap band 1
  const band1Geo = new THREE.TorusGeometry(0.55, 0.08, 8, 100);
  const bandMat1 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8b6eb9"),
    roughness: 0.65,
    metalness: 0.2,
  });
  const band1 = new THREE.Mesh(band1Geo, bandMat1);
  band1.rotation.x = Math.PI / 2.5;
  band1.position.y = 0.08;
  band1.castShadow = true;
  turbanGroup.add(band1);

  // Wrap band 2
  const band2Geo = new THREE.TorusGeometry(0.52, 0.08, 8, 100);
  const bandMat2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#9b7ec9"),
    roughness: 0.65,
    metalness: 0.2,
  });
  const band2 = new THREE.Mesh(band2Geo, bandMat2);
  band2.rotation.x = Math.PI / 2.5;
  band2.position.y = 0.22;
  band2.castShadow = true;
  turbanGroup.add(band2);

  // Wrap band 3
  const band3Geo = new THREE.TorusGeometry(0.48, 0.08, 8, 100);
  const bandMat3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ab8ed9"),
    roughness: 0.65,
    metalness: 0.2,
  });
  const band3 = new THREE.Mesh(band3Geo, bandMat3);
  band3.rotation.x = Math.PI / 2.5;
  band3.position.y = 0.36;
  band3.castShadow = true;
  turbanGroup.add(band3);

  // Front crest
  const crestGeo = new THREE.ConeGeometry(0.2, 0.35, 12);
  const crestMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#7a5eaa"),
    roughness: 0.6,
    metalness: 0.25,
  });
  const crest = new THREE.Mesh(crestGeo, crestMat);
  crest.position.set(0, 0.35, 0.3);
  crest.rotation.x = Math.PI * 0.25;
  crest.castShadow = true;
  turbanGroup.add(crest);

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
            
            // Add turban directly to character group
            const turban = createTurban();
            turban.position.set(0, 3.85, 0.15); // Positioned on top of head
            turban.scale.set(2.2, 1.8, 2.2); // Scale for visibility
            character.add(turban);
            console.log("[v0] ✅ Turban created and added to character");
            console.log("[v0] Turban children count:", turban.children.length);
            turban.children.forEach((child: any, i: number) => {
              console.log(`[v0] Turban child ${i}: ${child.name}, visible: ${(child as any).visible}`);
            });

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
