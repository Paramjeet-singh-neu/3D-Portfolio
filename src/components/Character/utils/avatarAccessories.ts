import * as THREE from "three";

const TURBAN_BLACK = new THREE.Color("#1a1a1a");
const TURBAN_FOLD = new THREE.Color("#2a2a2a");
const BEARD_BLACK = new THREE.Color("#121212");

const turbanMat = (color: THREE.Color) =>
  new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0.02,
    depthWrite: true,
  });

const beardMat = () =>
  new THREE.MeshStandardMaterial({
    color: BEARD_BLACK,
    roughness: 0.93,
    metalness: 0.01,
    depthWrite: true,
  });

/** Compact crown-only turban — sits on top of head, clear of face */
const createTurban = () => {
  const g = new THREE.Group();
  g.name = "PunjabiPagg";
  g.renderOrder = 0;

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
    turbanMat(TURBAN_BLACK)
  );
  dome.position.y = 0.06;
  g.add(dome);

  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.105, 0.11, 0.04, 32),
    turbanMat(TURBAN_BLACK)
  );
  band.position.y = 0.01;
  g.add(band);

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const fold = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.006, 8, 24, Math.PI * 0.85),
      turbanMat(i % 2 === 0 ? TURBAN_FOLD : TURBAN_BLACK)
    );
    fold.rotation.x = Math.PI / 2;
    fold.rotation.z = angle;
    fold.position.y = 0.04 + i * 0.012;
    g.add(fold);
  }

  return g;
};

/** Small chin beard only — does not cover mouth, eyes, or cheeks */
const createBeard = () => {
  const g = new THREE.Group();
  g.name = "StylizedBeard";
  g.renderOrder = 0;
  const mat = beardMat();

  const chin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.035, 0.14, 14),
    mat
  );
  chin.position.set(0, -0.07, 0.02);
  g.add(chin);

  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 10), mat);
  tip.scale.set(1, 1.25, 0.85);
  tip.position.set(0, -0.15, 0.02);
  g.add(tip);

  return g;
};

const removeAccessories = (root: THREE.Object3D) => {
  root.traverse((obj) => {
    if (obj.name === "PunjabiPagg" || obj.name === "StylizedBeard") {
      obj.parent?.remove(obj);
    }
  });
};

export const attachAvatarAccessories = (character: THREE.Object3D) => {
  removeAccessories(character);

  const headBone =
    character.getObjectByName("spine.006") ||
    character.getObjectByName("spine006");

  if (headBone) {
    const turban = createTurban();
    turban.position.set(0, 0.38, -0.04);
    turban.scale.set(2.15, 2.05, 2.15);
    headBone.add(turban);
  }

  if (headBone) {
    const beard = createBeard();
    beard.position.set(0, 0.22, 0.07);
    beard.scale.set(2.05, 2.05, 2.05);
    headBone.add(beard);
  }

  character.traverse((obj) => {
    if (obj.name === "Face.002" || obj.name === "EYEs.001" || obj.name === "Eyebrow") {
      obj.renderOrder = 2;
    }
  });
};
