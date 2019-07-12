/* 
管理商家模块
*/
import {
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT
} from '../mutation-tyoes'

import Vue from 'vue'

import { reqInfo, reqRatings, reqGoods } from '../../api'

const state = {
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
    cartFoods: [] //购物车food数组
}
const mutations = {
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },

    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },

    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [ADD_FOOD_COUNT](state, food) {
        if (!food.hasOwnProperty('count')) {
            //if (!food.count) {
            //给food对象添加一个新的属性：属性名为count，属性值为1
            //food.count = 1 //新添加的属性没有数据绑定
            Vue.set(food, "count", 1)
            //将food添加到cartFoods中
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [REDUCE_FOOD_COUNT](state, food) {
        if (food.count > 0) {
            food.count--
            //如果count减为了0，从caerFoods中删除此food
            if (food.count === 0) {
                delete food.count
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    }
}
const actions = {
    // 异步获取商家信息
    async getShopInfo({ commit }, cb) {
        const result = await reqInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
            cb && cb()
        }
    },
    // 异步获取商家评价列表
    async getShopRatings({ commit }, cb) {
        const result = await reqRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            cb && cb()
        }
    },

    // 异步获取商家商品列表
    async getShopGoods({ commit }, cb) {
        const result = await reqGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            cb && cb()
        }
    },
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(ADD_FOOD_COUNT, food)
        } else {
            commit(REDUCE_FOOD_COUNT, food)
        }
    }
}
const getters = {
    //总数量
    totalCount(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },
    //总数量
    totalPrice(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}