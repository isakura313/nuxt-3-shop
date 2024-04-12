import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { useProduct } from './productStore'

export const useData = defineStore("DataStore", {
  state: () => ({ initCount: 0, user: 1 }),   //user: 1 = guest
  getters: {
    getinitCount: (state) => state.initCount,
    getUser: (state) => state.user,
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
