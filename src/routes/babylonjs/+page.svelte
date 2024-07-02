<script lang="ts">
import * as BABYLON from "@babylonjs/core";
import { onMount } from "svelte";
import "@babylonjs/loaders";
import { createScene } from "./scene";

let el: HTMLCanvasElement;
const modelPath = "/avatars/";
const modelName = "model.glb";

onMount(() => {
	const { scene, engine } = createScene(el);
	BABYLON.SceneLoader.ImportMesh("", modelPath, modelName, scene, (meshes) => {
		// モデルデータをy=-2に移動
		meshes[0].position.y = -1;
	});

	engine.runRenderLoop(() => {
		scene.render();
	});

	return () => {
		engine.dispose();
	};
});
</script>

<svelte:head>
  <title>Babylon.JS</title>
</svelte:head>

<div class="container">
  <h1>Babylon.JS</h1>
  <h2>{modelPath}{modelName}</h2>
</div>
<canvas bind:this={el} />
