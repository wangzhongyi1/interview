<template>
  <div stylez="color: red;font-size: 28px;">
    <p>{{mainStore.count}}</p>
    <p>{{count}}</p>
    <p>count10: ----- {{count10}}</p>
    <p>{{foo}}</p>
    <p>{{arr}}</p>
    <button @click="handleChange">改变</button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/index'

const mainStore = useMainStore() //导出的 useMainStore 是一个函数，需要调用一下才能得到容器

// const { count, foo, arr } = mainStore //直接解构会失去响应式
const { count, foo, arr, count10 } = storeToRefs(mainStore)//使用 pinia 官方提供的 storeToRefs，就不会失去响应式

function handleChange() {
  // 修改数据方式一
  // mainStore.count += 1

  //修改数据方式二：有多个数据需要修改时建议使用可节约性能
  // mainStore.$patch({
  //   count: mainStore.count+1,
  //   foo: 'hello',
  //   arr: [...mainStore.arr, 4, 5, 6],
  // })

  //修改数据方式三：$patch 可以接受一个函数
  // mainStore.$patch(state => {
  //   state.count++;
  //   state.foo = 'hello';
  //   state.arr.push(4,5,6);
  // })

  //修改数据方式四：当逻辑复杂的时候可以放在 actions 中
  mainStore.changeCount(2);
  
}
</script>
