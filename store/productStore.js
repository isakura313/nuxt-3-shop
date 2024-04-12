import { defineStore } from "pinia";
import { useData } from './data'
import axios from 'axios'

export const useProduct = defineStore("productStore", {
  state: () => ({ cart: {}, simile: [] }),   //user: 1 = guest
  getters: {
    getCart: (state) => state.cart,
    getSimile: (state) => state.simile,
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



    findSame() {  //создание массива из 22 true/false нахождения товара в корзине
      let user = useData().user //получить id пользователя
      if (user == 1) { // если пользователь гость
        this.simile = []
        let edit = Object.keys(this.cart)
        let array = edit.map((item) => Number(item)) //строки в массиве в числа
        for (let i = 1; i < 23; i++) {
          this.simile.push(array.includes(i))
        }
      }
      if (user > 1) { //если пользователь авторизован
        setTimeout(() => {
          axios.get(`http://5.35.98.166:3000/cart/${user}`).then((res) => {
            this.simile = []
            let edit = Object.keys(res.data.carts) //ключи из объектов в один массив
            let array = edit.map((item) => Number(item)) //строки в массиве в числа
            for (let i = 1; i < 23; i++) {
              this.simile.push(array.includes(i))
            }
          })

        }, 500);
      }
    }




  },

  persist: true,
});
