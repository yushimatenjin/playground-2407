// Example code from
// https://github.com/yushimatenjin/RhodoniteTS/blob/main/samples/test_e2e/VRMImporter/main.ts

import Rn from "rhodonite/dist/esm/index.js";

export const createScene = async (canvas: HTMLCanvasElement) => {
	await Rn.System.init({
		approach: Rn.ProcessApproach.DataTexture,
		canvas: canvas,
	});

	return { Rn };
};
