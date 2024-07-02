// scene.tsで空のシーン（ライト・カメラを追加）
import { Engine } from "@babylonjs/core/Engines/engine";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

export const createScene = (canvas: HTMLCanvasElement) => {
	const engine = new Engine(canvas, true);
	engine.setSize(600, 600);
	const scene = new Scene(engine);

	// カメラを追加
	const camera = new ArcRotateCamera(
		"camera",
		0,
		0,
		1,
		new Vector3(0, 0, -2),
		scene,
	);
	camera.setTarget(Vector3.Zero());
	camera.attachControl(canvas, true);
	// シーンのクリアカラーを白色に設定
	scene.clearColor = new Color4(1, 1, 1, 1);
	const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	// 大きさを600に設定

	return { engine, scene };
};
