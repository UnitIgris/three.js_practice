import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import getStarfield from "./src/getStarField.js";

window.THREE = THREE
const w = window.innerWidth
const h = window.innerHeight
//Scene
const scene = new THREE.Scene()
//Camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.z = 5

//Material
const earthGroup = new THREE.Group()
earthGroup.rotation.z = -23.4 * Math.PI / 180
scene.add(earthGroup)

const loader = new THREE.TextureLoader
const geometry = new THREE.IcosahedronGeometry(1, 14)
const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load("/texture/00_earthmap4k.jpg"),
    lightMap: loader.load("/texture/03_earthlights4k.jpg"),
    lightMapIntensity: 0.2,
    bumpMap: loader.load("/texture/03_earthbump4k.jpg"),
    bumpScale: 1

})
const earthMesh = new THREE.Mesh(geometry, earthMaterial)
earthGroup.add(earthMesh)

const cameraControls = new THREE.OrbitControls(camera, renderer.domElement);


// const cloudsMaterial = new THREE.MeshBasicMaterial({
//     map: loader.load("/texture/04_earthcloudmap.jpg"),
//     blending: THREE.AdditiveBlending,
//     transparent: true,
//     opacity: 0.02
// })
// const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial)
// cloudsMesh.scale.setScalar(1.003)
// earthGroup.add(cloudsMesh)
// const stars = getStarfield({ numStars: 2000 });
// earthGroup.add(stars);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
// scene.add(hemiLight)

const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 2)
scene.add(sunLight)

//Render
const renderer = new THREE.WebGLRenderer({ antialias: true })
document.body.appendChild(renderer.domElement)
renderer.setSize(w, h)
new OrbitControls(camera, renderer.domElement)



function animate() {
    requestAnimationFrame(animate)

    earthMesh.rotation.y += 0.002
    // cloudsMesh.rotation.y += 0.0024
    renderer.render(scene, camera)
}

animate();


function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);