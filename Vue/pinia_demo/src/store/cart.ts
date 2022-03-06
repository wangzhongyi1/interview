import { IProduct, buyProducts } from './../api/shop';
import { defineStore } from 'pinia'
import { useProductsStore } from './products'

// 得到的结果就是 { id: number, title: string, price: number, quantity: number } ，排除了inventory属性 ,新增了quantity属性
type CartProduct = { //这里做了一个属性联合
    quantity: number
} & Omit<IProduct, 'inventory'> //Omit ts语法：排除某个熟悉

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cartProducts: [] as CartProduct[], //购物车商品列表
            checkoutStatus: '',
        }
    },

    getters: {
        getTotalPrice (state) {
            return state.cartProducts.reduce((pre, next) => {
                return pre + next.price * next.quantity
            }, 0)
        }
    },

    actions: {
        addProductToCart(product: IProduct) {
            //看商品有没有库存
            if (product.inventory < 1) {
                return
            }
            //检查购物车中是否已经有该商品
            const cartItem = this.cartProducts.find(item => item.id === product.id)
            if (cartItem) {
                //如果有则让商品数量加一
                cartItem.quantity++
            } else {
                //如果没有则添加到购物车
                this.cartProducts.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1, //第一次加入购物车的数量就是1
                })
            }

            //更新商品库存
            const productStore = useProductsStore()
            productStore.decrementProduct(product)
        },

        async checkout () {
            const ret = await buyProducts()
            this.checkoutStatus = ret ? '成功' : '失败'
        }
    },
})
