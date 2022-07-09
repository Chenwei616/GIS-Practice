<template>
  <q-page>
    <div
      id="cesium-container"
      :class="componentsStore.cesiumContainerClass"
      :style="componentsStore.cesiumContainerStyle"
    ></div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useCesiumStore } from "stores/cesium-store";
import { useComponentsStore } from "stores/components-store";
import { useAppStore } from "stores/app-store";

const cesium = useCesiumStore();
const componentsStore = useComponentsStore();
const appStore = useAppStore();

onMounted(() => {
  cesium.init("cesium-container");
  appStore.loadOut(cesium.viewer);
});
</script>
