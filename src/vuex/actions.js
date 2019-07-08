/*
包含N个用于间接修改数据的方法的对象
*/
import { reqAddress, reqCategorys, reqShops } from '../api'
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIEV_USER } from './mutation-tyoes'


export default {
  /*
  获取当前地址的异步action
  */
  async getAddress({ commit, state }) {
    const { longitude, latitude } = state
    //发异步ajax请求
    const result = await reqAddress(longitude, latitude)
    //有了结果后，提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  /*
  获取分类列表的异步action
  */
  async getCategorys({ commit }) {
    //发异步ajax请求
    const result = await reqCategorys()
    //有了结果后，提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },
  /*
    获取当前地址的异步action
    */
  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    //发异步ajax请求
    const result = await reqShops({ longitude, latitude })
    //有了结果后，提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },


  /* 
  记录user：
  1，持久化保存token
  2，在state中保存user
  */
  recordUser({ commit }, user) {
    //将user的token保存到localStorage中
    localStorage.setItem('token_key', user.token)
    //将userbacon到state中
    commit(RECEIEV_USER, { user })
  }
}
