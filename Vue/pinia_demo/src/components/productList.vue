<template>
    <ul>
        <li v-for="item in productsStore.all" :key="item.id">
            {{ item.title }} - {{ item.price }}
            <br>
            <button :disabled="!item.inventory" @click="cartStore.addProductToCart(item)">添加到购物车</button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

//加载所有数据
productsStore.loadAllProducts()

</script>
