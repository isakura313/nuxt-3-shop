<template>

  <div class="max-w-4xl mx-auto mt-14">
    <div class="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 ">Сумма товаров:</h5>
        <a class="text-sm font-medium text-blue-600 hover:underline ">

          <a v-if="productStore.quantity[0] == 'loader'">
            <svg aria-hidden="true" class="inline w-3 h-3 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </a>

          <a v-if="productStore.quantity[0] == 0">
            Добавьте что-то скорее
          </a>
          
          <a v-if="productStore.quantity[0] > 0">
            {{ productStore.quantity[1].toLocaleString() }} ₽
          </a>
        </a>
      </div>

      <div class="flow-root">
        <ul class="divide-y divide-gray-200 ">
          <a v-for="main, index in mainInfo">
            <li class="py-3 sm:py-4"
              v-if="productStore.simile[main.id] >= 1 || productStore.simile[main.id] == 'loader'">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="w-22 h-14 rounded-full" :src=main.image[1]>
                </div>
                <div class="flex-1 min-w-0 ms-4">
                  <p class="text-xl font-medium text-gray-900 truncate ">
                    {{ main.model }} {{ main.year }}
                    <button @click="deleteFromCart(main.id)">⨉</button>
                  </p>

                  <p class="text-s text-gray-500 truncate d">
                    {{ main.power }}л.с. / {{ main.engine }} / {{
                      main.transmission }} / {{ main.kuzov }} / {{ main.color }}
                  </p>
                </div>

                <button @click="productStore.simile[main.id] = 'loader', minusCart(main.id)" type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                  -
                </button>

                <a type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                  <a v-if="productStore.simile[main.id] == 'loader'">
                    <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                    </svg>
                  </a>
                  <a v-else>{{ productStore.simile[main.id] }}</a>
                </a>

                <button @click="productStore.simile[main.id] = 'loader', plusCart(main.id)" type="button"
                  class=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                  +
                </button>

                <div class="inline-flex text-xl items-center text-base font-semibold text-gray-900 mr-2">
                  <a v-if="productStore.simile[main.id] == 'loader'">считаем...</a>
                  <a v-else> {{ (main.price * productStore.simile[main.id]).toLocaleString() }} ₽</a>

                </div>
              </div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  </div>

</template>


<script setup>
import { useProduct } from '../store/productStore'
const runtimeConfig = useRuntimeConfig()
const productStore = useProduct();

const mainInfo = ref(0)
async function update() {
  const { data } = await useFetch(`${runtimeConfig.public.apiBase}/products`)
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
    }
  })
  mainInfo.value = mainData
}
update()

function deleteFromCart(value) {
  productStore.deleteFromCart(value);
}
function plusCart(value) {
  productStore.plusCart(value);
}
function minusCart(value) {
  productStore.minusCart(value);
}
productStore.findSame()
productStore.editQuantity()
</script>