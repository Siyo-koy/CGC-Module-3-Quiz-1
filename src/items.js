import * as THREE from 'three';
import { RingGeometry } from 'three/src/three.core';

// functiont to create room

function createWall(){
  const wall = new THREE.Group();

  // Materials
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('models/textures/metal.jpg', (texture) => {
      console.log('Texture loaded:', texture);
    }),
    side: THREE.DoubleSide // Make the material render on both sides of the geometry
  });
  
  // Geometries
  const columnGeometry = new THREE.BoxGeometry(1,10,1);
  const buntingGeometry = new THREE.BoxGeometry(1,1,7);
  const boxGeometry = new THREE.BoxGeometry(1,1,1);

  // Meshes
  const column1 = new THREE.Mesh(columnGeometry, wallMaterial);
  const column2 = new THREE.Mesh(columnGeometry, wallMaterial);
  const bunting1 = new THREE.Mesh(buntingGeometry, wallMaterial);
  const bunting2 = new THREE.Mesh(buntingGeometry, wallMaterial);
  const bunting3 = new THREE.Mesh(buntingGeometry, wallMaterial);
  const bunting4 = new THREE.Mesh(buntingGeometry, wallMaterial);

  const box1 = new THREE.Mesh(boxGeometry, wallMaterial);
  const box2 = new THREE.Mesh(boxGeometry, wallMaterial);
  const box3 = new THREE.Mesh(boxGeometry, wallMaterial);

  const box4 = new THREE.Mesh(boxGeometry, wallMaterial);
  const box5 = new THREE.Mesh(boxGeometry, wallMaterial);
  const box6 = new THREE.Mesh(boxGeometry, wallMaterial);

  // Rotations
  box2.rotation.x = Math.PI / 4;
  box3.rotation.x = Math.PI / 4;

  box5.rotation.x = Math.PI / 4;
  box6.rotation.x = Math.PI / 4;

  bunting3.rotation.z = Math.PI / 4;
  bunting4.rotation.z = Math.PI / 4;

  // Positions
  column2.position.z = -6
  bunting1.position.set(0,5,-3);
  bunting2.position.set(0,-5,-3);
  bunting3.position.set(.5,-5,-3);
  bunting4.position.set(-.5,-5,-3);

  box1.position.set(0,4.5,-1);
  box2.position.set(0,4,-.5);
  box3.position.set(0,4.7,-1.5);

  box4.position.set(0,4.5,-5);
  box5.position.set(0,4,-5.5);
  box6.position.set(0,4.7,-4.5);

  wall.add(column1, column2, box1, box2, box3, box4, box5, box6, bunting1, bunting2, bunting3, bunting4);
  return wall;

}


export function createRoom(){
  const room = new THREE.Group();

  // Materials
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('models/textures/metal2.jpg', (texture) => {
      console.log('Texture loaded:', texture);
    }),
    side: THREE.DoubleSide // Make the material render on both sides of the geometry
  });
  
  const spaceMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('models/textures/space.jpg', (texture) => {
      console.log('Texture loaded:', texture);
    }),
    side: THREE.DoubleSide // Make the material render on both sides of the geometry
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('models/textures/metal.jpg', (texture) => {
      console.log('Texture loaded:', texture);
    }),
    side: THREE.DoubleSide // Make the material render on both sides of the geometry
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial();
  glassMaterial.color = new THREE.Color(0xffffff);
  glassMaterial.transmission = .95;
  glassMaterial.roughness = 0.1;
  glassMaterial.dispersion = 0.2;
  glassMaterial.transparent = true;

  // Geometries
  const floorGeometry = new THREE.BoxGeometry(20,0.1,20);
  const leftWallGeometry = new THREE.BoxGeometry(0.1,10,20,1);
  const rightWallGeometry = new THREE.BoxGeometry(20,10,0.1,1);

  // Meshes
  const floor = new THREE.Mesh(floorGeometry,floorMaterial);
  const ceiling = new THREE.Mesh(floorGeometry,wallMaterial);
  const leftWall = new THREE.Mesh(leftWallGeometry,spaceMaterial);
  const rightWall = new THREE.Mesh(rightWallGeometry,spaceMaterial);
  const leftGlass = new THREE.Mesh(leftWallGeometry, glassMaterial);
  const rightGlass = new THREE.Mesh(rightWallGeometry, glassMaterial);

  const leftWall1 = createWall();
  const leftWall2 = createWall();
  const leftWall3 = createWall();

  const leftWall4 = createWall();
  const leftWall5 = createWall();
  const leftWall6 = createWall();

  // Shadow
  const floorShadowGeometry = new THREE.PlaneGeometry( 20, 20 );
  const floorShadowMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
  const floorShadow = new THREE.Mesh( floorShadowGeometry, floorShadowMaterial );

  // Shadow Positions
  floorShadow.rotation.x = - Math.PI / 2;
  floorShadow.position.y = 0.1; // Position floor slightly below the pedestal and room
  floorShadow.receiveShadow = true;

  // Rotations
  leftWall4.rotation.y = Math.PI / 2;
  leftWall5.rotation.y = Math.PI / 2;
  leftWall6.rotation.y = Math.PI / 2;

  // Positions
  leftWall.position.set(-9.95,5,0);
  rightWall.position.set(0,5,-9.95);

  leftGlass.position.set(-9.5,5,-1);
  rightGlass.position.set(0,5,-9.95);
  
  ceiling.position.y = 10.5;

  // More Positions
  leftWall1.position.set(-9.5,5,9.5);
  leftWall2.position.set(-9.5,5,3.5);
  leftWall3.position.set(-9.5,5,-2.5);

  leftWall4.position.set(-2.5,5,-9.34);
  leftWall5.position.set(3.5,5,-9.34);
  leftWall6.position.set(9.5,5,-9.34);

  room.add(floor, floorShadow, leftWall1, leftWall2, leftWall3, leftWall4, leftWall5, leftWall6);
  room.add(leftGlass, rightGlass, ceiling);
  return room;
}

// Pedestal
const pedestalMaterial = new THREE.MeshStandardMaterial({ 
  map: new THREE.TextureLoader().load('models/textures/metal.jpg', (texture) => {
    console.log('Texture loaded:', texture);
  })
});

const doubleSidedMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load('models/textures/metal.jpg', (texture) => {
    console.log('Texture loaded:', texture);
  }),
  side: THREE.DoubleSide // Make the material render on both sides of the geometry
});

function pedestalLegs(){
  const pLegs = new THREE.Group();

  const geometry = new THREE.TorusGeometry(0.5, 0.3, 8, 8, Math.PI); // Adjust the arc to half (PI)
  const columnGeometry = new THREE.CylinderGeometry(.1, .1, 3, 6);

  const torus1 = new THREE.Mesh(geometry, pedestalMaterial);
  const torus2 = new THREE.Mesh(geometry, pedestalMaterial);
  const torus3 = new THREE.Mesh(geometry, pedestalMaterial);
  const torus4 = new THREE.Mesh(geometry, pedestalMaterial);
  const column1 = new THREE.Mesh(columnGeometry,pedestalMaterial);
  const column2 = new THREE.Mesh(columnGeometry,pedestalMaterial);

  // Position the toruses
  torus1.position.set(-0.5, -1.5, 0);
  torus2.position.set(0.5, -1.5, 0);
  torus3.position.set(0, 1.5, -0.5);
  torus4.position.set(0, 1.5, 0.5);

  column1.position.set(0.5,0,0.5);
  column2.position.set(-0.5,0,-0.5);

  // Rotations
  torus3.rotation.y = Math.PI / 2;
  torus3.rotation.x = Math.PI / 1;

  torus4.rotation.y = Math.PI / 2;
  torus4.rotation.x = Math.PI / 1;

  // Add the toruses to the group
  pLegs.add(torus1, torus2, torus3, torus4, column1, column2);
  pLegs.castShadow = true;
  return pLegs;
}

function createBowl(){
  const bowlParts = new THREE.Group();

  // Geometry for the outer lathe
  const points = [];
  for (let i = 0; i < 10; i++) {
    // Scale the points directly in the loop to make the lathe wider and shorter
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 1.5 + 1.2, (i - 5) * 0.1)); // Outer lathe: wider and shorter
  }
  
  const latheGeometry = new THREE.LatheGeometry(points);
  
  // Geometry for the inner lathe (slightly smaller)
  const innerPoints = [];
  for (let i = 0; i < 10; i++) {
    // Scale the points for the inner lathe to be smaller
    innerPoints.push(new THREE.Vector2(Math.sin(i * 0.2) * 1.4 + 1.2, (i - 5) * 0.1)); // Inner lathe: smaller and same height
  }
  
  const innerLatheGeometry = new THREE.LatheGeometry(innerPoints);  // Smaller lathe
  const latheFillGeometry = new THREE.RingGeometry(2.4,2.7,12);
  const latheBottomGeometry = new THREE.CylinderGeometry(1.5,1.5,.1,12);

  // Parts
  const top = new THREE.Mesh(latheGeometry, doubleSidedMaterial); // Outer lathe
  const innerTop = new THREE.Mesh(innerLatheGeometry, doubleSidedMaterial); // Inner lathe
  const latheFill = new THREE.Mesh(latheFillGeometry, doubleSidedMaterial);
  const latheBottom = new THREE.Mesh(latheBottomGeometry, pedestalMaterial);

  // Positions
  latheFill.position.y = 0.4
  latheBottom.position.y = -0.3

  // Rotations
  latheFill.rotation.x = Math.PI / 2;

  // Scale
  innerTop.scale.set(0.95, 1, 0.95);  

  bowlParts.add(top, innerTop, latheFill, latheBottom);
  return bowlParts;
}

function createPedestalPart() {
  const pedestal = new THREE.Group();

  // Geometry
  const bodyGeometry = new THREE.CylinderGeometry(.7, .7, 3, 8);
  const bottomGeometry = new THREE.CylinderGeometry(1.5, 1.5, .15, 8);
  const bottomLowerGeometry = new THREE.CylinderGeometry(1.6, 1.6, .08, 8);

  // Create the pedestal parts
  const legs1 = pedestalLegs();
  const legs2 = pedestalLegs();
  const bottomBowl = createBowl();

  const body = new THREE.Mesh(bodyGeometry, pedestalMaterial);
  const bottom = new THREE.Mesh(bottomGeometry, pedestalMaterial);
  const bottomLower = new THREE.Mesh(bottomLowerGeometry, pedestalMaterial);

  // Position the parts
  bottom.position.y = -1.35;
  bottomLower.position.y = -1.4;
  bottomBowl.position.y = 1.9;

  // Rotate the second set of legs
  legs2.rotation.y = Math.PI / 2;

  // Add everything to the pedestal group
  pedestal.add(legs1, legs2, body, bottom, bottomLower, bottomBowl); 

  return pedestal;
}

export function createSource(){
  const sourceMaterial = new THREE.MeshPhongMaterial({color: 0x00DBD1, emissive: 0x00DBD1 , emissiveIntensity: 10});
  const sourceGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const source = new THREE.Mesh(sourceGeometry, sourceMaterial);
  source.scale.set(0.05,0.05,0.05);
  source.position.y = 6.5;
  return source;
}

export function createSourceLight(){
  const light = new THREE.PointLight( 0x4CFFF7, 8, 10 );
  light.position.y = 6.5;
  return light;
}

export function createOrb(){
  const orb = new THREE.Group();

  // Materials
  const glassMaterial = new THREE.MeshPhysicalMaterial();
    glassMaterial.color = new THREE.Color(0xffffff);
    glassMaterial.transmission = .95;
    glassMaterial.roughness = 0.2;
    glassMaterial.dispersion = 0.9;
    glassMaterial.transparent = true;


  // Geometries
  const glassGeometry = new THREE.DodecahedronGeometry(3);
  // Meshes
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);

  // Scale

  // Positions

  // Rotations

  orb.add(glass);
  return orb;
}

export function createPedestal(){
  const pedestal = new THREE.Group();
  
  // parts
  const lowerPedestal = createPedestalPart();

  // positiona

  // rotation

  pedestal.add(lowerPedestal);
  return pedestal;
}