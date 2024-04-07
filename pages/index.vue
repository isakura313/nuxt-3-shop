<template>

  <main class="bg-white max-w-7xl mx-auto">

    <div class="max-w-7xl mx-auto mb-3">
      <Filters />

    </div>

    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow inline-block m-5"
      v-for="main, index in mainInfo">

      <h5 class="mb-1 text-xl font-medium text-gray-900 ml-4 pt-4">
        <NuxtLink :to="`/product/${main.id}`">
          {{ main.brand }} {{ main.model }}
        </NuxtLink>
      </h5>

      <p class="text-sm text-gray-500 ml-4 mr-4">{{ main.year }}г. / {{ main.power }}л.с. / {{ main.engine }} / {{
        main.transmission }} / {{ main.kuzov }} / {{ main.color }}</p>

      <div class="flex flex-col items-center h-48">
        <img class=" rounded-t-lg " v-bind:src="main.image[1]" />
      </div>

      <h5 class="mb-1 text-xl font-medium text-gray-900 ml-4">{{ main.price.toLocaleString() }} ₽</h5>
      <span class="text-sm text-gray-500 ml-4"> {{ (Math.round(main.price / 84)).toLocaleString() }} ₽/мес</span>


      <div class="flex flex-col items-center pb-10">
        <div class="flex mt-4 md:mt-6">




          <!-- <button v-if="simile[main.id - 1] == -100"
            class="inline-flex items-center px-12 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"><svg
              aria-hidden="true" role="status" class="inline w-3 h-3 me-3 text-white animate-spin" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor" />
            </svg></button>

          <button v-if="simile[main.id - 1] == -1" @click="simile[main.id - 1] = -100, addToCart(main), compare()"
            class="inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Купить</button>

          <NuxtLink to="/cart"><button v-if="simile[main.id - 1] >= 0"
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-center text-gray-900 border border-gray rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300">
              В корзине >
            </button></NuxtLink> -->






            <button v-if="simile[main.id - 1] == -100"
            class="inline-flex items-center px-12 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"><svg
              aria-hidden="true" role="status" class="inline w-3 h-3 me-3 text-white animate-spin" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor" />
            </svg></button>

          <button v-if="simile[main.id - 1] == -1" @click="simile[main.id - 1] = -100, addToCart(main)"
            class="inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Купить</button>

          <NuxtLink to="/cart"><button v-if="simile[main.id - 1] >= 0"
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-center text-gray-900 border border-gray rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300">
              В корзине >
            </button></NuxtLink>









          <button v-if="simileFavourite[main.id - 1] == -1"
            @click="simileFavourite[main.id - 1] = -100, addToFavourite(main), compareFavourite()"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </button>


          <button v-if="simileFavourite[main.id - 1] == -100"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
            <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </button>





          <button v-if="simileFavourite[main.id - 1] >= 0"
            @click="simileFavourite[main.id - 1] = -100, deleteFromFavourite(main)"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
              class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="currentColor" viewBox="0 0 24 24">
              <path
                d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Pagination />
  </main>
</template>


<script setup>
import axios from 'axios'
import { useCart } from '../store/carStore'
import { FwbPagination } from 'flowbite-vue'
import db from '../db.json'
import Filters from "../src/components/index/filters.vue"
import Pagination from "../src/components/index/pagination.vue"
const runtimeConfig = useRuntimeConfig()
const cartStore = useCart();

let search = ref([])
provide("search", search)
watch(search, () => {
  update()
})




const currentPage = ref(1)
provide("currentPage", currentPage)
watch(currentPage, () => {
  update()
  console.log("update")
})





const mainInfo = ref(0)
async function update() {
  const page = currentPage.value
  const { data } = await useFetch(`${runtimeConfig.public.apiBase}/products?${search.value.join('')}&_page=${page}`)

  const mainData = data.value.map((item, index) => {
    return {
      id: data.value[index].id,
      brand: data.value[index].brand,
      model: data.value[index].model,
      year: data.value[index].year,
      power: data.value[index].power,
      kuzov: data.value[index].kuzov,
      transmission: data.value[index].transmission,
      engine: data.value[index].engine,
      color: data.value[index].color,
      price: data.value[index].price,
      image: {
        1: data.value[index].image[1],
        2: data.value[index].image[2],
        3: data.value[index].image[3],
        4: data.value[index].image[4],
        5: data.value[index].image[5],
      },
      amount: 1, //количество штук в карточке
    }
  })
  mainInfo.value = mainData
}





const simile = ref([])
function compare() {
  let locate = ref()
  setTimeout(() => {
    axios.get(`${runtimeConfig.public.apiBase}/cart`).then((res) => {
      locate.value = res
    })
  }, 500);
  //список товаров в корзине

  watch(locate, () => {
    compare1()
  }) //после получения списка товаров compare1

  function compare1() {
    let idArray = []
    idArray = locate.value.data.map((item) => item.id)

    simile.value = []
    for (let b = 1; b < 23; b++) {
      simile.value.push(idArray.indexOf(b))
    }
  }

}
compare()

// async function addToCart(value) {
//   const { data } = await $fetch(`${runtimeConfig.public.apiBase}/cart`, { method: 'POST', body: value })
//   cartStore.addinitCount()
//   compare()
// }



async function addToCart(value) {
  const getData = await $fetch(`${runtimeConfig.public.apiBase}/products/${value.id}`, { method: 'GET' })

  const { data } = await $fetch(`${runtimeConfig.public.apiBase}/products/${value.id}`, { method: 'PATCH', body: { "cart": [getData.cart + 1] } })
  // update()



  // const { data } = await $fetch(`${runtimeConfig.public.apiBase}/cart`, { method: 'POST', body: value })
  // const { data } = await $fetch(`${runtimeConfig.public.apiBase}/products/${value.id}`, { method: 'PATCH', body: { cart: "" } })

}


cartStore.addinitCount()




const simileFavourite = ref([])
function compareFavourite() {
  let locateFavourite = ref()
  setTimeout(() => {
    axios.get(`${runtimeConfig.public.apiBase}/favourite`).then((res) => {
      locateFavourite.value = res
    })
  }, 500);
  //список товаров в избранном

  watch(locateFavourite, () => {
    compare1Favourite()
  }) //после получения списка товаров compare1

  function compare1Favourite() {
    let idArrayFavourite = []
    idArrayFavourite = locateFavourite.value.data.map((item) => item.id)

    simileFavourite.value = []
    for (let b = 1; b < 22; b++) {
      simileFavourite.value.push(idArrayFavourite.indexOf(b))
    }
  }

}
compareFavourite()



async function addToFavourite(value) {
  const { data } = await $fetch(`${runtimeConfig.public.apiBase}/favourite`, { method: 'POST', body: value })
}

async function deleteFromFavourite(value) {
  const { data } = await $fetch(`${runtimeConfig.public.apiBase}/favourite/${value.id}`, { method: 'DELETE' })
  compareFavourite()
}






await update()



</script>
