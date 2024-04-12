import { defineStore } from "pinia";
import { useData } from './data'

export const useProduct = defineStore("productStore", {
  state: () => ({ cart: {} }),   //user: 1 = guest
  getters: {
    getCart: (state) => state.cart,
  },
  actions: {
    async addToCart(value) {
      let user = useData().user //получить id пользователя

      if (user == 1) { //если гость (1)
        // this.cart.push(value);
        this.cart[value.id] = 1
        console.log(this.cart)
      }
      if (user > 1) { //если автоизован (>1)

        const getData = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        editData[value.id] = 1
        // editData.push(value.id)
        console.log(editData)
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },
  },

  persist: true,
});
