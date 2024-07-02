<script lang="ts">
import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import type { VRM } from "@pixiv/three-vrm";
import { onMount } from "svelte";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { createScene } from "./scene";

let el: HTMLCanvasElement;
const modelPath = "/avatars/model.vrm";

onMount(() => {
	const { scene, loader, controls } = createScene(el);

	// @ts-ignore
	loader.register((parser) => {
		return new VRMLoaderPlugin(parser);
	});

	loader.load(modelPath, (gltf: GLTF) => {
		const vrm = gltf.userData.vrm as VRM;
		vrm.scene.rotateY(Math.PI);
		scene.add(vrm.scene);

		controls.target.set(0, 1, 0);
	});
});
</script>

<svelte:head>
  <title>THREE.js</title>
</svelte:head>

<div class="container">
  <h1>THREE.js</h1>
  <h2>{modelPath}</h2>
</div>

<canvas bind:this={el} />


