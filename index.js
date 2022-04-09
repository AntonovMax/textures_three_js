import * as THREE from './node_modules/three/build/three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x002222);
const fogColor = new THREE.Color(0x7b7b7b);
// scene.fog = new THREE.Fog(fogColor, 2, 6);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Loader
const loader = new THREE.TextureLoader()

// Textures
const texture = loader.load( "textures/texture2.jpg" );
const planeTexture = loader.load( "img/forest.jpg");

const gemAOTex = loader.load( "textures/gem_textures/Crystal_004_ambientOcclusion.jpg");
const gemBCTex = loader.load('textures/gem_textures/Crystal_004_basecolor.jpg');
const gemHTex = loader.load('textures/gem_textures/Crystal_004_height.png');
const gemNormalTex = loader.load('textures/gem_textures/Crystal_004_normal.jpg');
const gemRTex = loader.load('textures/gem_textures/Crystal_004_roughness.jpg');


// Object
// const geometry = new THREE.SphereGeometry(2, 25, 25);
// const material = new THREE.MeshStandardMaterial( { color: 0xe5e5e5,
//     metalness: 0.9,
//     roughness: 0,
//     emissive: new THREE.Color(0x878787),
//     normalMap: texture,
//     transparent: true,
//     opacity: 0.7,
//     side: THREE.DoubleSide
// } );

// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// GlassObject
// const geometry2 = new THREE.IcosahedronGeometry(1, 0);
const geometry2 = new THREE.SphereGeometry(1, 20, 20);
const material2 = new THREE.MeshPhysicalMaterial({
    emissive: new THREE.Color(0x001122),
    // color: new THREE.Color(0xFF2200),
    roughness: 0,
    transmission: 1,
    // transmissionMap: texture ,
    thickness: 0.9,
    clearcoat: 0.9,

    /////////////////////////////////////////////////////////////
    map: gemBCTex,

    displacementMap: gemHTex,
    displacementScale: 2,
    displacementBias: -0.5,

    normalMap: gemNormalTex,
    normalScale: new THREE.Vector2(-2, 4),

    roughnessMap: gemRTex,
    roughness: 0.9,

    aoMap: gemAOTex,
    aoMapIntensity: 0.9,
});
const mesh = new THREE.Mesh(geometry2, material2)
mesh.position.set(0, 0, 4)
scene.add(mesh);

// Gem
// const gemGeometry = new THREE.SphereGeometry(2, 300, 300);
// const gemMaterial = new THREE.MeshStandardMaterial({
//     map: gemBCTex,
  
//     normalMap: gemNormalTex,
//     normalScale: new THREE.Vector2(-2, 4),

//     displacementMap: gemHTex,
//     displacementScale: 3,
//     displacementBias: -2,


//     roughnessMap: gemRTex,
//     roughness: 0.1,

    // aoMap: gemAOTex,
    // aoMapIntensity: 0.5,

// //   transmission: 1,
//     thickness: 0.5
// });
// const gem = new THREE.Mesh(gemGeometry, gemMaterial);
// scene.add(gem);


//******** GlassGem
// const glassGemGeometry = new THREE.SphereGeometry(2, 10, 10)
// const glassGemMaterial = new THREE.MeshStandardMaterial({
//     roughness: 0,
//     transmission: 1,
//     thickness: 0.5,
//     clearcoat: 0.9
// })
// const glassGem = new THREE.Mesh(glassGemGeometry,glassGemMaterial);
// scene.add(glassGem);

//Plane
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({map: planeTexture});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add( plane );

// RectLight
// const rectLights = new THREE.RectLight(0xFFFFFF, 0.9, 2, 2);
// scene.add(rectLights);

// SpotLight
const spotLight = new THREE.SpotLight( { color: 0xFFFFFF, intensity: 1});
spotLight.position.set(0, -10, 0);
spotLight.target = mesh;
scene.add( spotLight );

// const spotHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotHelper );

// DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xfff0dd, 1);
directionalLight.position.set(0, 5, 10);
scene.add(directionalLight);

// AmbientLight
const ambientLight = new THREE.AmbientLight( { color: 0xFFFFFF, intensity: 0.9, power: 0.9})
scene.add( ambientLight );

// RectLight
const rectLight = new THREE.RectAreaLight( 0xffff00, 0.1,  1, 1 );
rectLight.position.set( 50, 5, 0 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight );

// Control
// const controls = new THREE.OrbitControls( camera, renderer.domElement );
// controls.update();
// console.log(THREE);

camera.position.z = 8;

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    // cube.rotation.x += 0.009;
    // cube.rotation.y += 0.007;

    mesh.rotation.y += 0.0009;
    // gem.rotation.y += 0.0009;

    // controls.update();
}
animate();