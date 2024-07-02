<!-- Example code from 
https://github.com/actnwit/RhodoniteTS/blob/main/samples/test_e2e/VRMImporter/main.ts -->

<script lang="ts">
import { onMount } from "svelte";
import { createScene } from "./scene";

let el: HTMLCanvasElement;
let p: HTMLParagraphElement;
const modelPath = "/avatars/model.vrm";

onMount(async () => {
	const { Rn } = await createScene(el);

	const cameraEntity = Rn.EntityHelper.createCameraControllerEntity();
	cameraEntity.getTransform().localPosition = Rn.Vector3.fromCopyArray([
		0.0, 0, 0.5,
	]);

	const lightEntity2 = Rn.EntityHelper.createLightEntity();
	const lightComponent2 = lightEntity2.getLight();
	lightComponent2.type = Rn.LightType.Directional;
	lightComponent2.intensity = Rn.Vector3.fromCopyArray([1.0, 1.0, 1.0]);
	lightEntity2.getTransform().localEulerAngles = Rn.Vector3.fromCopyArray([
		0.0,
		0.0,
		Math.PI / 8,
	]);

	const rootGroups = (
		await Rn.Vrm0xImporter.importFromUri(`${modelPath}`, {
			defaultMaterialHelperArgumentArray: [{ isLighting: true }],
			tangentCalculationMode: 0,
		})
	).unwrapForce();

	for (const rootGroup of rootGroups) {
		rootGroup.getTransform().localEulerAngles = Rn.Vector3.fromCopyArray([
			0,
			Math.PI,
			0.0,
		]);
	}

	const cameraControllerComponent = cameraEntity.getCameraController();
	const controller =
		cameraControllerComponent.controller as Rn.OrbitCameraController;
	controller.setTarget(rootGroups[0]);
	controller.dolly = 0.78;

	// renderPass
	const renderPass = new Rn.RenderPass();
	renderPass.toClearColorBuffer = true;
	renderPass.toClearDepthBuffer = true;
	renderPass.addEntities(rootGroups);

	const expression = new Rn.Expression();
	expression.addRenderPasses([renderPass]);

	Rn.System.startRenderLoop(() => {
		Rn.System.process([expression]);
	});
});
</script>

<svelte:head>
  <title>Rhodonite</title>
</svelte:head>

<div class="container">
  <h1>Rhodonite</h1>
  <h2>{modelPath}</h2>
  <p bind:this={p} />
</div>
<canvas width="600" height="600" bind:this={el} />

<style>
</style>
