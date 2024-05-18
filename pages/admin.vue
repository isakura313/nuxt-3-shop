<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Логин</th>
          <th scope="col" class="px-6 py-3">Пароль</th>
          <th scope="col" class="px-6 py-3">Корзина</th>
          <th scope="col" class="px-6 py-3">Избранное</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:border-gray-700" v-for="(data, index) in getData">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            @click="deleteAccount(data.id)"
          >
            {{ data.id }}
          </th>
          <td class="px-6 py-4">
            {{ data.login }}
          </td>
          <td class="px-6 py-4">
            {{ data.pass }}
          </td>
          <td class="px-6 py-4">
            {{ getCart[index].carts }}
          </td>
          <td class="px-6 py-4">
            {{ getFavourite[index].favourites }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useProduct } from '../store/productStore';
import { useFavourite } from '../store/productFavourite';

const productStore = useProduct();
const favouriteStore = useFavourite();

const runtimeConfig = useRuntimeConfig();

const getData = ref();
const getCart = ref();
const getFavourite = ref();
async function updateData() {
  getData.value = await $fetch(`${runtimeConfig.public.apiBase}/users`, { method: 'GET' });
  getCart.value = await $fetch(`${runtimeConfig.public.apiBase}/cart`, { method: 'GET' });
  getFavourite.value = await $fetch(`${runtimeConfig.public.apiBase}/favourite`, { method: 'GET' });
}
updateData();

async function deleteAccount(value) {
  await $fetch(`${runtimeConfig.public.apiBase}/users/${value}`, { method: 'DELETE' });
  await $fetch(`${runtimeConfig.public.apiBase}/cart/${value}`, { method: 'DELETE' });
  await $fetch(`${runtimeConfig.public.apiBase}/favourite/${value}`, { method: 'DELETE' });
  productStore.editQuantity();
  updateData();
}
</script>
