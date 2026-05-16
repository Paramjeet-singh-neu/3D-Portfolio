import * as THREE from "three";

/** Subtle warm tint — keep face texture so eyes stay visible */
export const SKIN_TONE = new THREE.Color("#B8825C");

export const SHIRT_COLOR = new THREE.Color("#C8CD85");

const HIDDEN_NODE_NAMES = new Set(["CAP.001", "CAP.002", "Hair"]);

/** Do not tint Face — preserves eyes/mouth textures from the GLB */
const SKIN_NODE_NAMES = new Set(["Neck", "Hand", "Ear.001"]);

export const shouldHideHeadwearMesh = (obj: THREE.Object3D) =>
  HIDDEN_NODE_NAMES.has(obj.name) || HIDDEN_NODE_NAMES.has(obj.parent?.name ?? "");

export const shouldApplySkinTone = (obj: THREE.Object3D) =>
  SKIN_NODE_NAMES.has(obj.name);

export const applySkinToneToMesh = (mesh: THREE.Mesh) => {
  const applyToMaterial = (mat: THREE.Material) => {
    if (!(mat instanceof THREE.MeshStandardMaterial)) return mat;
    const cloned = mat.clone();
    cloned.color.lerp(SKIN_TONE, 0.45);
    cloned.roughness = Math.min(cloned.roughness, 0.75);
    return cloned;
  };

  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map((m) => applyToMaterial(m) ?? m);
  } else if (mesh.material) {
    mesh.material = applyToMaterial(mesh.material) ?? mesh.material;
  }
};

export const customizeCharacterMeshes = (character: THREE.Object3D) => {
  character.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    if (shouldHideHeadwearMesh(child)) {
      child.visible = false;
      return;
    }

    if (shouldApplySkinTone(child)) {
      applySkinToneToMesh(child);
    }

    if (child.name === "BODY.SHIRT" || child.parent?.name === "BODY.SHIRT") {
      const mat = (child.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
      mat.color.copy(SHIRT_COLOR);
      child.material = mat;
    } else if (child.name === "Pant" || child.parent?.name === "Pant") {
      const mat = (child.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color("#1a1a1a");
      child.material = mat;
    }

    child.castShadow = true;
    child.receiveShadow = true;
    child.frustumCulled = true;
  });
};
