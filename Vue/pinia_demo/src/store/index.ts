import { defineStore } from 'pinia'

//1. 定义容器并导出
//需要一个唯一 id，如下面的 main
export const useMainStore = defineStore('main', {
    /**
     * 类似组件的 data，用来存储全局状态
     * 1. 必须是函数，这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
     * 2. 必须是箭头函数，为了更好的 TS 类型推导
     * 
     */
    state: () => { //这里必须是箭头函数
        return {
            count: 0,
            foo: 'bar',
            arr: [1,2,3],
        }
    },

    /**
     * 类似 vue 计算属性，有缓存功能
     */
    getters: {
        // count10 (state) { // state 是一个可选参数
        //     return state.count + 10
        // },
        count10 ():number { // state 是一个可选参数
            //如果不传入 state 参数，也可以通过 this 来访问相关变量
            //但是 ts 类型推断会有问题，需要指定返回值类型
            return this.count + 10;
        }
    },

    /**
     * 没有 mutations，更加简洁，同步或异步逻辑都可以写在这里
     */
    actions: { //写在这里的函数不能是箭头函数(this指向问题), 都可以接受一个参数
        changeCount(payload: number) {
            //可以通过 this 来直接修改 state 中的数据
            this.count += payload;
            this.foo = 'hello';
            this.arr.push(4);

            // 也可以在 action 中使用 $patch 进行批量更新
            // this.$patch({})
            // this.$patch(state => {})
        }
    },
})
//2. 使用容器中的 state
//3. 修改 state
//4. 容器中 action 的使用
