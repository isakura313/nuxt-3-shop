import { defineStore } from 'pinia';
import { useProduct } from './productStore';
import axios from 'axios';
import db from '../db.json';

export const useUser = defineStore('userStore', {
  state: () => ({ userInfo: {} }),
  getters: {
    getUserInfo: (state) => state.userInfo
  },
  actions: {
    async getDataCarts() {
      const getData = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, {
        method: 'GET'
      }); //получить корзину пользователя
      return getData.carts;
    },

    async addToCart(value) {
      const editData = await this.getDataCarts();

      console.log(editData);
      editData[value.id] = 1;
      await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, {
        method: 'PATCH',
        body: { carts: editData }
      }); //пуш id товара в корзину
    },

    async deleteFromCart(value) {
      const editData = await this.getDataCarts();
      delete editData[value];
      await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, {
        method: 'PATCH',
        body: { carts: editData }
      }); //пуш id товара в корзину
    },

    async plusCart(value) {
      const editData = await this.getDataCarts();
      editData[value] = editData[value] + 1;
      await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, {
        method: 'PATCH',
        body: { carts: editData }
      }); //пуш id товара в корзину
    },

    async minusCart(value) {
      const editData = await this.getDataCarts();
      if (editData[value] > 1) {
        editData[value] = editData[value] - 1;
        await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, {
          method: 'PATCH',
          body: { carts: editData }
        }); //пуш id товара в корзину
      }
    },

    findSame() {
      //массив объектов {id: кол-во в корзине}
      setTimeout(() => {
        axios.get(`http://5.35.98.166:3000/cart/${useProduct().user}`).then((res) => {
          useProduct().simile = [];
          let keys = Object.keys(res.data.carts); //ключи из объектов в один массив
          let keysNum = keys.map((item) => Number(item)); //строки в массиве в числа
          let values = Object.values(res.data.carts); //значения из объектов в один массив
          for (let i = 1; i <= db.products.length; i++) {
            //TODO переписать на forEach и find
            if (keysNum.indexOf(i) >= 0) {
              useProduct().simile[i] = values[keysNum.indexOf(i)];
            } else {
              useProduct().simile[i] = 0;
            }
          }
        });
      }, 500);
    },

    editQuantity() {
      setTimeout(() => {
        axios.get(`http://5.35.98.166:3000/cart/${useProduct().user}`).then((res) => {
          let keysNum = Object.keys(res.data.carts); //ключи из объектов в один массив
          let keys = keysNum.map((item) => Number(item - 1)); //строки в массиве в числа -1 тк из id в индекс
          let values = Object.values(res.data.carts); //значения из объектов в один массив
          useProduct().quantity[0] = keys.length; //количество
          for (let i = 0; i < useProduct().quantity[0]; i++) {
            useProduct().quantity[1] =
              useProduct().quantity[1] + values[i] * db.products[keys[i]].price; //сумма = сумма + (количество[индекс в массиве] * цена[индекс в db])
          }
        });
      }, 500);
    }
  },
  persist: true
});
