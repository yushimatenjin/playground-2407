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
      <div class="note">No official support for VRM currently</div>
    </a>
    <a href="/babylonjs" rel="external" class:current={$currentPath === "/babylonjs"}>
      <div class="library">Babylon.js</div>
      <div class="loader">SceneLoader</div>
      <div class="model">model.glb</div>
      <div class="note">Planned to change to babylon-vrm-loader</div>
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

  /* Add loader */
  .loader::before {
    content: "Loader: ";
    color: gray;
    font-size: 0.8em;
  }
  /* Add text to the left of the model indicating the file format */
  .model::before {
    content: "File format: ";
    color: gray;
    font-size: 0.8em;
  }

  .note{
    color: gray;
    font-size: 0.8em;
  }

  .note::before {
    content: "*";
    color: gray;
    font-size: 0.8em;
  }

  :global(canvas) {
    border: 1px solid #ccc;
  }

</style>

