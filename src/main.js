import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

// Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(14,14,14);
camera.lookAt(0,0,0);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(255,255,255);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true; // Enable shadow mapping
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadows
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight( 0xffffff, 0.1 );  // Change to a DirectionalLight
light.position.set(2, 10, 2); // Set light position
light.castShadow = true; // Enable shadow casting from the light
scene.add(light);

// Optional: add ambient light to brighten the scene
const ambientLight = new THREE.AmbientLight( 0x404040 ); // Ambient light to softly illuminate the scene
scene.add(ambientLight);

// Imports
import { createRoom } from './items';
import { createPedestal } from './items';
import { createSource } from './items';
import { createSourceLight } from './items';
import { createOrb } from './items';

// Create objects
const room = createRoom();
const pedestal = createPedestal();
const source = createSource();
const sourceLight = createSourceLight();
const glass = createOrb();

// Add objects to scene
scene.add(room);
scene.add(pedestal);
scene.add(source);
scene.add(sourceLight);
scene.add(glass);

// Positions
pedestal.position.y = 1.5;
glass.position.y = 6.5;

// Enable shadows on objects (if applicable)
room.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;  // Room should receive shadows
  }
});

pedestal.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;  // Pedestal should cast shadows
    child.receiveShadow = true;  // Pedestal should also receive shadows
  }
});

scene.background = new THREE.CubeTextureLoader()
	.load( [
  'models/textures/space2.jpg', 
  'models/textures/space2.jpg',
  'models/textures/space2.jpg', 
  'models/textures/space2.jpg',
  'models/textures/space2.jpg', 
  'models/textures/space2.jpg',
],
function (loadedTexture) {
  console.log('Skybox loaded successfully!');
  scene.background = loadedTexture; // Set the skybox once it's loaded
},
undefined, // Optional progress callback
function (error) {
  console.error('Error loading skybox images:', error);
}
);


// Animate
function animate() {
  requestAnimationFrame(animate); 

  if (source) {
    source.rotation.x += 0.01; // Rotate around the x-axis
    source.rotation.y += 0.01; // Rotate around the y-axis
  }

  if (glass) {
    glass.rotation.x += 0.009; // Rotate around the x-axis
    glass.rotation.y += 0.009; // Rotate around the y-axis
  }
  
  controls.update();
  renderer.render(scene, camera); 
}

animate();
