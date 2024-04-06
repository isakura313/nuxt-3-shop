import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
// const runtimeConfig = useRuntimeConfig()

export const useCart = defineStore("cartStore", {
  state: () => ({ initCount: 0}),
  getters: {
    getinitCount: (state) => state.initCount,
  },
  actions: {
    addinitCount() {
      this.initCount = -100
      setTimeout(() => {
        axios.get(`http://5.35.98.166:3000/cart`).then((res) => {
          this.initCount = res.data.length
        })
      }, 500);
    },

  },

  persist: true,
});
