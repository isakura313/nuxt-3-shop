import { defineStore } from "pinia";
import { useData } from './data'
import axios from 'axios'

export const useProduct = defineStore("productStore", {
  state: () => ({ cart: {}, simile: {} }),   //user: 1 = guest
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
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },

    async deleteFromCart(value) {
      let user = useData().user //получить id пользователя
      if (user == 1) { //если гость (1)
        delete this.cart[value]
      }
      if (user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        delete editData[value]
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },

    async plusCart(value) {
      let user = useData().user //получить id пользователя
      if (user == 1) { //если гость (1)
        this.cart[value] = this.cart[value] + 1
      }
      if (user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        editData[value] = editData[value] + 1
        const { data } = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
      }
    },

    async minusCart(value) {
      let user = useData().user //получить id пользователя
      if (user == 1) { //если гость (1)
        this.cart[value] = this.cart[value] - 1
      }
      if (user > 1) { //если автоизован (>1)
        const getData = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'GET' }) //получить корзину пользователя
        let editData = getData.carts
        if (editData[value] > 1) {
          editData[value] = editData[value] - 1
          const { data } = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
        }
      }
    },

    // findSame() {  //создание массива из 22 true/false нахождения товара в корзине
    //   let user = useData().user //получить id пользователя
    //   if (user == 1) { // если пользователь гость
    //     this.simile = []
    //     let edit = Object.keys(this.cart) //получить только ключи
    //     let array = edit.map((item) => Number(item)) //строки в массиве в числа
    //     for (let i = 1; i < 23; i++) {
    //       this.simile.push(array.includes(i))
    //     }
    //   }
    //   if (user > 1) { //если пользователь авторизован
    //     setTimeout(() => {
    //       axios.get(`http://5.35.98.166:3000/cart/${user}`).then((res) => {
    //         this.simile = []
    //         let edit = Object.keys(res.data.carts) //ключи из объектов в один массив
    //         let array = edit.map((item) => Number(item)) //строки в массиве в числа
    //         for (let i = 1; i < 23; i++) {
    //           this.simile.push(array.includes(i))
    //         }
    //       })

    //     }, 500);
    //   }
    // }











    findSame() {  //массив объектов {id: кол-во в корзине}
      let user = useData().user //получить id пользователя

      if (user == 1) { // если пользователь гость
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

      if (user > 1) { //если пользователь авторизован
        setTimeout(() => {
          axios.get(`http://5.35.98.166:3000/cart/${user}`).then((res) => {
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
    }










  },

  persist: true,
});
