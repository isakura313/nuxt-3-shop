import { defineStore } from "pinia";
import { useProduct } from './productStore'

export const useUser = defineStore("userStore", {
    state: () => ({}),   //user: 1 = guest
    getters: {
    },
    actions: {
        async addToUser(value) {
            let user = useCart().user //получить id пользователя
            if (user == 1) { //если гость (1)
                useProduct().addToCart(value);
            }
            if (user > 1) { //если автоизован (>1)

                const getData = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'GET' }) //получить корзину пользователя
                let editData = getData.carts
                editData[value.id] = 1
                // editData.push(value.id)
                console.log(editData)
                const { data } = await $fetch(`http://5.35.98.166:3000/cart/${user}`, { method: 'PATCH', body: { "carts": editData } }) //пуш id товара в корзину
            }
        }

    },

    persist: true,
});
