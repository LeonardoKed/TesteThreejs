import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// OrbitControls (rotação com o mouse)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;

// Luz ambiente
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Luz direcional
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Carregar GLB
const loader = new GLTFLoader();
loader.load(
  'templo3.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);
    console.log("Modelo carregado!");
  },
  undefined,
  (error) => {
    console.error("Erro ao carregar o modelo:", error);
  }
);

function animate() {
  controls.update(); // necessário para suavidade
  renderer.render(scene, camera);
}