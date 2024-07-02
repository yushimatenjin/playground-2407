<script lang="ts">
import { GlbLoader } from "$lib/playcanvas";
import { Entity } from "playcanvas";
import { onMount } from "svelte";
import { createScene } from "./scene";

let el: HTMLCanvasElement;
const modelUrl = "/avatars/model.vrm";

onMount(() => {
	const { root } = createScene(el);

	const model = new Entity("model");
	model.rotate(0, 180, 0);
	model.addComponent("script");
	model?.script?.create(GlbLoader, {
		attributes: {
			modelUrl: modelUrl,
		},
	});
	root.addChild(model);
});
</script>

<svelte:head>
  <title>PlayCanvas</title>
</svelte:head>

<div class="container">
  <h1>PlayCanvas</h1>
  <h2>{modelUrl}</h2>
</div>
<canvas bind:this={el} />
