import { defineStore } from "pinia";
import { useCesiumStore } from "stores/cesium-store";
import { useWindowStore } from "./window-store";
import { computed } from "vue";
import { toRaw } from "vue";

const cesium = useCesiumStore();
const windowStore = useWindowStore();
const changeToBingMap = cesium.changeToBingMap;
const mainHeight = computed(() => {
  return windowStore.height - 65 + "px";
});
const mainWidth = computed(() => {
  return windowStore.width + "px";
});

export const useComponentsStore = defineStore("Components", {
  state: () => ({
    viewMode: 1,

    viewDivClass: "absolute-top-right",
    viewDivStyle: {
      height: "250px",
      width: "250px",
      overflow: "hidden",
      disabled: "disabled",
      "margin-top": "10px",
      "margin-right": "10px",
      "z-index": 10,
      "border-radius": "50%",
    },
    cesiumContainerStyle: {
      height: mainHeight,
      width: mainWidth,
      overflow: "",
      "margin-top": "0px",
      "margin-right": "0px",
      "z-index": 0,
      "border-radius": "",
    },
    cesiumContainerClass: "relative-position",
    showManagerInterface: true,
    layerSelectVisible: false,
    allVisible: true,

    disasterDefaultClass: "",
  }),
  getters: {},
  actions: {
    layerSelectRight() {
      this.layerSelectVisible = !this.layerSelectVisible;
    },
    layerBingMap() {
      this.layerSelectVisible = !this.layerSelectVisible;
      changeToBingMap();
    },

    controlViewModel() {
      if (this.viewMode == 1) {
        this.viewMode = 0;
        this.disasterDefaultClass = "text-black";
        this.viewDivStyle.height = mainHeight;
        this.viewDivStyle.width = mainWidth;
        this.viewDivStyle["margin-top"] = "0px";
        this.viewDivStyle["margin-right"] = "0px";
        this.viewDivStyle["border-radius"] = "";
        this.viewDivStyle.overflow = "hidden";
        toRaw(this.cesiumContainerStyle).height = "250px";
        toRaw(this.cesiumContainerStyle).width = "250px";
        this.cesiumContainerStyle["margin-top"] = "10px";
        this.cesiumContainerStyle["margin-right"] = "10px";
        this.viewDivClass = "relative-position";
        this.viewDivStyle["z-index"] = 0;
        this.cesiumContainerClass = "absolute-top-right";
        this.cesiumContainerStyle["z-index"] = 10;
        this.cesiumContainerStyle["border-radius"] = "50%";
        this.cesiumContainerStyle.overflow = "hidden";
        cesium.viewer.scene.screenSpaceCameraController.tiltEventTypes = [];
        cesium.viewer.scene.screenSpaceCameraController.enableRotate = false;
        cesium.viewer.scene.screenSpaceCameraController.enableZoom = false;
      } else {
        this.viewMode = 1;
        this.disasterDefaultClass = "text-white";
        toRaw(this.viewDivStyle).height = "250px";
        toRaw(this.viewDivStyle).width = "250px";
        this.viewDivStyle["margin-top"] = "10px";
        this.viewDivStyle["margin-right"] = "10px";
        toRaw(this.cesiumContainerStyle).height = mainHeight;
        toRaw(this.cesiumContainerStyle).width = mainWidth;
        this.cesiumContainerStyle["margin-top"] = "0px";
        this.cesiumContainerStyle["margin-right"] = "0px";
        this.viewDivClass = "absolute-top-right";
        this.viewDivStyle["z-index"] = 10;
        this.cesiumContainerClass = "relative-position";
        this.cesiumContainerStyle["z-index"] = 0;
        this.viewDivStyle["border-radius"] = "50%";
        this.viewDivStyle.overflow = "hidden";
        this.cesiumContainerStyle["border-radius"] = "";
        this.cesiumContainerStyle.overflow = "";
        cesium.viewer.scene.screenSpaceCameraController.tiltEventTypes = [
          Cesium.CameraEventType.MIDDLE_DRAG,
          Cesium.CameraEventType.PINCH,
          {
            eventType: Cesium.CameraEventType.LEFT_DRAG,
            modifier: Cesium.KeyboardEventModifier.CTRL,
          },
          {
            eventType: Cesium.CameraEventType.RIGHT_DRAG,
            modifier: Cesium.KeyboardEventModifier.CTRL,
          },
        ];
        cesium.viewer.scene.screenSpaceCameraController.enableRotate = true;
        cesium.viewer.scene.screenSpaceCameraController.enableZoom = true;
      }
    },

  },
});
