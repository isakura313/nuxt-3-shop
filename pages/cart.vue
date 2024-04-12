<template>

  <div class="max-w-4xl mx-auto mt-14">
    <div class="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 ">Сумма товаров:</h5>
        <a class="text-sm font-medium text-blue-600 hover:underline ">
          {{ cartSumm.toLocaleString() }} ₽
        </a>
      </div>

      <div class="flow-root">
        <ul class="divide-y divide-gray-200 ">
          <li class="py-3 sm:py-4" v-for="main, index in mainInfo">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="w-22 h-14 rounded-full" :src=main.image[1]>
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-xl font-medium text-gray-900 truncate ">
                  {{ main.model }} {{ main.year }}
                  <button @click="deleteFromCart(main)">⨉</button>
                </p>



                <p class="text-s text-gray-500 truncate d">
                  {{ main.power }}л.с. / {{ main.engine }} / {{
                    main.transmission }} / {{ main.kuzov }} / {{ main.color }}
                </p>
              </div>




              <a v-if="main.amount === 1"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-s-lg">
                -
              </a>
              <button v-if="main.amount > 1" @click="minusCart(main)" type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                -
              </button>


              <a type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                {{ main.amount }}
              </a>

              <button @click="plusCart(main)" type="button"
                class=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                +
              </button>

              <div class="inline-flex text-xl items-center text-base font-semibold text-gray-900 mr-2">
                {{ (main.price * main.amount).toLocaleString() }} ₽
              </div>





            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>


<script setup>
import { useData } from '../store/data'
const runtimeConfig = useRuntimeConfig()
const cartStore = useCart();










const mainInfo = ref(0)
async function update() {
  const { data } = await useFetch(`${runtimeConfig.public.apiBase}/cart`)
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
      amount: data.value[index].amount, //количество штук в карточке
    }
  })
  mainInfo.value = mainData
}
update()


async function deleteFromCart(value) {
  const { data } = await $fetch(`${runtimeConfig.public.apiBase}/cart/${value.id}`, { method: 'DELETE' })
  update()
  dataStore.addinitCount()
}

async function plusCart(value) {
  const getData = await $fetch(`${runtimeConfig.public.apiBase}/cart/${value.id}`, { method: 'GET' })
  const { data } = await $fetch(`${runtimeConfig.public.apiBase}/cart/${value.id}`, { method: 'PATCH', body: { "amount": getData.amount + 1 } })
  update()
}


async function minusCart(value) {
  const getData = await $fetch(`${runtimeConfig.public.apiBase}/cart/${value.id}`, { method: 'GET' })
  const { data } = await $fetch(`${runtimeConfig.public.apiBase}/cart/${value.id}`, { method: 'PATCH', body: { "amount": getData.amount - 1 } })
  update()
}





const cartSumm = ref(0)
function fCartSumm() {
  cartSumm.value = 0
  for (let i = 0; i < mainInfo.value.length; i++)
    cartSumm.value = cartSumm.value + (mainInfo.value[i].price * mainInfo.value[i].amount)
  console.log(cartSumm)
}
watch(mainInfo, () => {
  fCartSumm()
})


</script>