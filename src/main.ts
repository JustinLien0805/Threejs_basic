import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
const scene = new THREE.Scene();

const geometry = new THREE.OctahedronGeometry(5, 0);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xd1b592,
  // roughness: 1,
  // transmission: 1,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
// wireframe
// var geo = new THREE.WireframeGeometry(sphere.geometry); // or WireframeGeometry
// var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 5 });
// var wireframe = new THREE.LineSegments(geo, mat);
// sphere.add(wireframe);

const sizes = { width: window.innerWidth, height: window.innerHeight };

// camera (FOV, aspect ratio, near(limit), far(limit))
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
scene.add(camera);

// light
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(10, 10, 10);
scene.add(light);

const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(4);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

const animation = () => {
  sphere.rotation.y += 0.001;
  sphere.rotation.x += 0.0007;
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
};

animation();

const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(sphere.scale, { x: 0.1, y: 0.1, z: 0.1 }, { x: 1, y: 1, z: 1 });
t1.fromTo(".navbar", { opacity: 0 }, { opacity: 1 }, "-=1");
