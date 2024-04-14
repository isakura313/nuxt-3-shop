<template>
    <div v-if="productStore.user == 1">

        <div v-if="RegOrLogin == 1" class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
                <input v-model="regLogin"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
                <input v-model="regPass"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <button @click="registration()"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Зарегистрироваться</button>
            <button @click="RegOrLogin = 2" class="ml-3 text-gray-700"> Уже есть аккаунт?</button>
        </div>

        <div v-if="RegOrLogin == 2" class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
                <input v-model="enterLogin"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
                <input v-model="enterPass"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <button @click="enter()"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Войти</button>
            <button @click="RegOrLogin = 1" class="ml-3 text-gray-700">У меня нет аккаунта</button>
        </div>
    </div>

    <div class="mx-auto w-24" v-if="productStore.user > 1">
        Ваш id = {{ productStore.user }}
        <button @click="productStore.user = 1">Выйти</button>
    </div>

</template>

<script setup>
import { useProduct } from '../store/productStore'

const productStore = useProduct();
const runtimeConfig = useRuntimeConfig()
const RegOrLogin = ref(1) //выбор вход или регистрация

const regLogin = ref() //введенный логин в регистрации
const regPass = ref() //введенный пароль в регистрации
async function registration() {
    const getData = await $fetch(`${runtimeConfig.public.apiBase}/users`, { method: 'GET' })
    let logins = [] //массив логинов
    for (let i = 0; i < getData.length; i++) {
        logins.push(getData[i].login) //пуш логинов
    }
    if (logins.includes(regLogin.value) == false) { //если такого логина ещё нет допускается регистрация
        const { data } = await $fetch(`${runtimeConfig.public.apiBase}/users`, { method: 'POST', body: { "id": getData.length + 1, "login": regLogin.value, "pass": regPass.value } })
        const gettData = await $fetch(`${runtimeConfig.public.apiBase}/users`, { method: 'GET' })
        productStore.user = gettData.length  //задает id пользователя в аккаунте
        const { data2 } = await $fetch(`${runtimeConfig.public.apiBase}/cart`, { method: 'POST', body: { "id": getData.length + 1, "carts": {} } }) //создает корзину для нового пользователя
        const { data3 } = await $fetch(`${runtimeConfig.public.apiBase}/favourite`, { method: 'POST', body: { "id": getData.length + 1, "favourites": {} } }) //создает избанное для нового пользователя
    }
    else {
        alert("Пользователь с таким логином уже существует")
    }
}

const enterLogin = ref() //введенный логин во входе
const enterPass = ref() //введенный пароль во входе
async function enter() {
    const getData = await $fetch(`${runtimeConfig.public.apiBase}/users`, { method: 'GET' })
    let logins = [] //массив логинов
    let passes = [] //массив паолей
    for (let i = 0; i < getData.length; i++) {
        logins.push(getData[i].login) //пуш логинов
        passes.push(getData[i].pass) //пуш паролей
    }

    let indexLogin = logins.indexOf(enterLogin.value) //поиск введенного логина в массиве и возврат индекса, если найден
    if (indexLogin > 0 && enterPass.value == passes[indexLogin]) { // if индекс логина больше 0, введенный пароль = паролю с индексом логина в списке паролей 
        alert("успешно")
        productStore.user = indexLogin + 1
    }
    else { // if индекс логина и пароля не совпадает >> productStore.user = 1, т.е. гость
        alert("неверный логин или пароль")
        productStore.user = 1
    }
}
// {
// "cart": [
//     {
//       "id": 1,
//       "carts": {}
//     }
// ],
//   "favourite": [
// {
//       "id": 1,
//       "favourites": {}
// }
// ],
//   "users": [
//     {
//       "id": 1,
//       "login": "guest",
//       "pass": "guest"
//     }
//   ],
</script>