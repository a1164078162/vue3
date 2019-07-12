/* 
使用mokejs实现moke数据接口
*/
import Mock from 'mockjs'
import data from './data.json' //自动解析为js  可以相互转换

// moke goods接口
Mock.mock('/goods', { code: 0, data: data.goods })
// moke ratings接口
Mock.mock('/ratings', { code: 0, data: data.ratings })
// moke info接口
Mock.mock('/info', { code: 0, data: data.info })

//export default ???
console.log('mockServer启动了...')