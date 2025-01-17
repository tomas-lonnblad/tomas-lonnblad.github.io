import * as THREE from "three";
import getBgSphere from "./getBgSphere.js";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { TeapotGeometry } from 'jsm/geometries/TeapotGeometry.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const texLoader = new THREE.TextureLoader();
const path = './assets/textures/matcap/';

function setTextureRepeatAndWrap (tex) {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
}

const colorMap = texLoader.load(`${path}baseColor.png`, (tex) => {
  setTextureRepeatAndWrap(tex);
});
const normalMap = texLoader.load(`${path}normal.png`, (tex) => {
  setTextureRepeatAndWrap(tex);
});
const roughnessMap = texLoader.load(`${path}roughness.png`, (tex) => {
  setTextureRepeatAndWrap(tex);
});

// const geometry = new TeapotGeometry(1);
const geometry = new THREE.TorusKnotGeometry(1, 0.4, 256, 32);
// const material = new THREE.MeshStandardMaterial({
//   map: colorMap,
//   // normalScale: new THREE.Vector2(6, 6),
  // normalMap,
//   metalness: 0.5,
//   // roughness: 0,
//   roughnessMap,
//   // wireframe: true
//   side: THREE.DoubleSide
// });
const material = new THREE.MeshMatcapMaterial({
  // normalMap,
  // normalScale: new THREE.Vector2(2, 2),
  matcap: texLoader.load(`${path}wax.png`),
});
console.log(material);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// lights
// const sunlight = new THREE.DirectionalLight(0xFFFFFF, 2);
// sunlight.position.set(2, 2, 2);
// scene.add(sunlight);

// const fillColor = new THREE.Color().setHSL(0.1, 0.5, 0.5);
// const filllight = new THREE.DirectionalLight(fillColor, 1);
// filllight.position.set(-2, -2 , -2);
// scene.add(filllight);

// const hemiLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1);
// scene.add(hemiLight);

const gradientBackground = getBgSphere({ lightnessMult: 0.005});
scene.add(gradientBackground);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
