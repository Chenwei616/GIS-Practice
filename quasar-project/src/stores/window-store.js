import { defineStore } from "pinia";

export const useWindowStore = defineStore("windowStore", {
  state: () => ({
    width: 0,
    height: 0,
  }),

  getters: {},

  actions: {
    eventWindowResize() {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
    },
  },
});
