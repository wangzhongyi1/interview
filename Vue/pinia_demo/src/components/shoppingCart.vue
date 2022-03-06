<template>
    <div class="cart">
        <h2>你的购物车</h2>
        <p>
            <i>请添加一些商品到购物车</i>
        </p>
        <ul>
            <li v-for="item in cartStore.cartProducts" :key="item.id">{{item.title}} - {{item.price}} x {{item.quantity}}</li>
        </ul>
        <p>商品总价：{{cartStore.getTotalPrice}}</p>
        <p>
            <button @click="cartStore.checkout">结算</button>
        </p>
        <p>结算: {{cartStore.checkoutStatus}}</p>
    </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()

</script>
