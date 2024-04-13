import { defineStore } from "pinia";
import { useUser } from './userStore'

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
        useUser().addToCart(value)
      }
    },

    async deleteFromCart(value) {
      if (this.user == 1) { //если гость (1)
        delete this.cart[value]
      }
      if (this.user > 1) { //если автоизован (>1)
        useUser().deleteFromCart(value)
      }
    },

    async plusCart(value) {
      if (this.user == 1) { //если гость (1)
        this.cart[value] = this.cart[value] + 1
      }
      if (this.user > 1) { //если автоизован (>1)
        useUser().plusCart(value)
      }
    },

    async minusCart(value) {
      if (this.user == 1) { //если гость (1)
        this.cart[value] = this.cart[value] - 1
      }
      if (this.user > 1) { //если автоизован (>1)
        useUser().minusCart(value)
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
        useUser().findSame()
      }
    },
  },

  persist: true,
});
