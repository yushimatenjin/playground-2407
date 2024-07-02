<script lang="ts">
import { page } from "$app/stores";
import { derived } from "svelte/store";
const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<main>
  <div class="sidebar">
    <!-- Homeを追加 -->
    <a href="/" rel="external" class:current={$currentPath === "/"}>
      <div class="library">Home</div>
    </a>
    <a href="/threejs" rel="external" class:current={$currentPath === "/threejs"}>
      <div class="library">Three.js</div>
      <div class="loader">three-vrm</div>
      <div class="model">model.vrm</div>
    </a>
    <a href="/rhodonite" rel="external" class:current={$currentPath === "/rhodonite"}>
      <div class="library">Rhodonite</div>
      <div class="loader">Vrm0xImporter</div>
      <div class="model">model.vrm</div>
    </a>
    <a href="/playcanvas" rel="external" class:current={$currentPath === "/playcanvas"}>
      <div class="library">PlayCanvas</div>
      <div class="loader">glTFLoader</div>
      <div class="model">model.vrm</div>
      <div class="note">VRMへの公式対応は現在無し</div>
    </a>
    <a href="/babylonjs" rel="external" class:current={$currentPath === "/babylonjs"}>
      <div class="library">Babylon.js</div>
      <div class="loader">SceneLoader</div>
      <div class="model">model.glb</div>
      <div class="note">babylon-vrm-loaderに変更予定</div>
    </a>
  </div>
  <div class="content">
    <slot />
  </div>
</main>

<style>
  .sidebar {
    float: left;
    width: 200px;
  }
  .content {
    margin-left: 220px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  a.current {
    font-size: 1.1rem;
  }

  .library {
    display: block;
    font-weight: bold;
    text-decoration: underline;
    font-size: 1.2em;
    margin-top: 10px;
  }

  .loader, .model {
    display: block;
    color: gray;
    font-size: 1em;
  }

  /* ローダーを追加 */
  .loader::before {
    content: "ローダー: ";
    color: gray;
    font-size: 0.8em;
  }
  /* modelの左側にファイル形式という::beforeに文字を追加 */
  .model::before {
    content: "ファイル形式: ";
    color: gray;
    font-size: 0.8em;
  }

  .note{
    color: gray;
    font-size: 0.8em;
  }

  .note::before {
    content: "※";
    color: gray;
    font-size: 0.8em;
  }

  :global(canvas) {
    border: 1px solid #ccc;
  }

</style>

