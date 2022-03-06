<template>
  <div class="about">
    <h1>pinia - 购物车示例</h1>
    <hr>
    <h2>商品列表</h2>
    <productList />
    <hr>
    <shoppingCart />
  </div>
</template>

<script lang="ts" setup>
import productList from '../components/productList.vue';
import shoppingCart from '../components/shoppingCart.vue';

</script>
