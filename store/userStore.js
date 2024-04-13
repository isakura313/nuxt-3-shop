import { defineStore } from "pinia";
import { useProduct } from './productStore'
import axios from 'axios'

export const useUser = defineStore("userStore", {
    state: () => ({}),
    getters: {
    },
    actions: {
        async addToCart(value) {
            const getData = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'GET' }) //получить корзину пользователя
            let editData = getData.carts
            editData[value.id] = 1
            const { data } = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
        },

        async deleteFromCart(value) {
            const getData = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'GET' }) //получить корзину пользователя
            let editData = getData.carts
            delete editData[value]
            const { data } = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
        },

        async plusCart(value) {
            const getData = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'GET' }) //получить корзину пользователя
            let editData = getData.carts
            editData[value] = editData[value] + 1
            const { data } = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
        },

        async minusCart(value) {
            const getData = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'GET' }) //получить корзину пользователя
            let editData = getData.carts
            if (editData[value] > 1) {
                editData[value] = editData[value] - 1
                const { data } = await $fetch(`http://5.35.98.166:3000/cart/${useProduct().user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
            }
        },

        findSame() {  //массив объектов {id: кол-во в корзине}
            setTimeout(() => {
                axios.get(`http://5.35.98.166:3000/cart/${useProduct().user}`).then((res) => {
                    useProduct().simile = []
                    let keys = Object.keys(res.data.carts) //ключи из объектов в один массив
                    let keysNum = keys.map((item) => Number(item)) //строки в массиве в числа
                    let values = Object.values(res.data.carts) //значения из объектов в один массив
                    for (let i = 1; i < 23; i++) {
                        if (keysNum.indexOf(i) >= 0) {
                            useProduct().simile[i] = values[keysNum.indexOf(i)]
                        }
                        else {
                            useProduct().simile[i] = 0
                        }
                    }
                })
            }, 500);
        },
    },
    persist: true,
});
