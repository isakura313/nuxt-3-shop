import { defineStore } from "pinia";
import axios from 'axios'

export const useProduct = defineStore("productStore", {
  state: () => ({ cart: {}, simile: {}, user: 1 }),   //user: 1 = guest
  getters: {
    getCart: (state) => state.cart,
    getSimile: (state) => state.simile,
    getUser: (state) => state.user,
  },
  actions: {
    async addToCart(value) {

      if (this.user == 1) { //если гость (1)
        // this.cart.push(value);
        this.cart[value.id] = 1
      }
      if (this.user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        editData[value.id] = 1
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },

    async deleteFromCart(value) {
      if (this.user == 1) { //если гость (1)
        delete this.cart[value]
      }
      if (this.user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        delete editData[value]
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },

    async plusCart(value) {
      if (this.user == 1) { //если гость (1)
        this.cart[value] = this.cart[value] + 1
      }
      if (this.user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        editData[value] = editData[value] + 1
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },

    async minusCart(value) {
      if (this.user == 1) { //если гость (1)
        this.cart[value] = this.cart[value] - 1
      }
      if (this.user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        if (editData[value] > 1) {
          editData[value] = editData[value] - 1
          const { data } = await $fetch(`http://5.35.98.166:3000/cart/${this.user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
        }
      }
    },




    findSame() {  //массив объектов {id: кол-во в корзине}
      if (this.user == 1) { // если пользователь гость
        this.simile = []
        let keys = Object.keys(this.cart) //ключи из объектов в один массив
        let keysNum = keys.map((item) => Number(item)) //строки в массиве в числа
        let values = Object.values(this.cart) //значения из объектов в один массив
        for (let i = 1; i < 23; i++) {
          if (keysNum.indexOf(i) >= 0) {
            this.simile[i] = values[keysNum.indexOf(i)]
          }
          else {
            this.simile[i] = 0
          }
        }
      }

      if (this.user > 1) { //если пользователь авторизован
        setTimeout(() => {
          axios.get(`http://5.35.98.166:3000/cart/${this.user}`).then((res) => {
            this.simile = []
            let keys = Object.keys(res.data.carts) //ключи из объектов в один массив
            let keysNum = keys.map((item) => Number(item)) //строки в массиве в числа
            let values = Object.values(res.data.carts) //значения из объектов в один массив
            for (let i = 1; i < 23; i++) {
              if (keysNum.indexOf(i) >= 0) {
                this.simile[i] = values[keysNum.indexOf(i)]
              }
              else {
                this.simile[i] = 0
              }
            }
          })

        }, 500);
      }
    },








  },

  persist: true,
});
