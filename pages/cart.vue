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
          <a v-for="main, index in mainInfo">
            <li class="py-3 sm:py-4" v-if="productStore.simile[main.id] >= 1">
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




                <button @click="minusCart(main.id)" type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                  -
                </button>



                <a type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                  {{ productStore.simile[main.id] }}
                </a>







                <button @click="plusCart(main.id)" type="button"
                  class=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                  +
                </button>

                <div class="inline-flex text-xl items-center text-base font-semibold text-gray-900 mr-2">
                  {{ (main.price * productStore.simile[main.id]).toLocaleString() }} ₽
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
  productStore.findSame()
}
productStore.findSame()

function plusCart(value) {
  productStore.plusCart(value);
  productStore.findSame()
}


function minusCart(value) {
  productStore.minusCart(value);
  productStore.findSame()
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