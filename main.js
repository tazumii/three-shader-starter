import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(4);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  stencil: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);

const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
const fragmentShader = `
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(vUv, 0.0, 1.0);
    }
  `;
const material = new THREE.ShaderMaterial({
  extensions:{
    derivatives: "#extension GL_OES_standard_derivatives : enable"
  },
  uniforms: {
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh)

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
}
animate();