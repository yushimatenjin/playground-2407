import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const createScene = (canvas: HTMLCanvasElement) => {
	const scene = new THREE.Scene();
	const loader = new GLTFLoader();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	camera.position.z = 1;
	camera.position.y = 2;

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});
	renderer.setSize(600, 600);
	renderer.setClearColor(0xffffff); // 白色のClearColorを設定

	// オービットコントロールを追加
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;

	// 環境光の強度を調整
	const ambientLight = new THREE.AmbientLight(0xffffff, 3);
	scene.add(ambientLight);

	function animate() {
		requestAnimationFrame(animate);

		// オービットコントロールを更新
		controls.update();

		renderer.render(scene, camera);
	}
	animate();
	return { scene, loader, controls };
};
