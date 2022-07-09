<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <!-- <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="Menu"
          @click="switchShowMode"
        /> -->

        <q-toolbar-title> 东四教学楼 </q-toolbar-title>

        <div>—— by 第四组</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered mini justify-center style="margin:auto">
      <q-btn
        flat
        dense
        round
        icon="home"
        aria-label="Menu"
        @click="switchShowMode"
      />
      <q-list>
        <q-item-label header> </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useWindowStore } from "src/stores/window-store";
import { useAppStore } from "stores/app-store";
import { useCesiumStore } from "stores/cesium-store";

const cesium = useCesiumStore();
const appStore = useAppStore();

const windowStore = useWindowStore();
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const showMode = ref("Z");

const switchShowMode = () => {
  // if (showMode.value == 'Z') {
  //   appStore.levelSwitch('H', cesium.viewer);
  //   showMode.value = 'H';
  // } else {
  //   appStore.levelSwitch('Z', cesium.viewer);
  //   showMode.value = 'Z';
  // }
  appStore.levelSwitch(cesium.viewer);
};

onMounted(() => {
  (window.onload = () => {
    windowStore.eventWindowResize();
  }),
    (window.onresize = () => {
      windowStore.eventWindowResize();
    });
});
</script>
