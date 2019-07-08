/*
包含N个用于直接修改状态数据的方法的对象
*/
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIEV_USER } from './mutation-tyoes'

export default {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  [RECEIEV_USER](state, { user }) {
    state.user = user
  }
}
