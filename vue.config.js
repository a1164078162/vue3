module.exports = {
  // 代理配置
   devServer: {
     proxy: {
       '/api': {
         target: 'http://localhost:5000',
         changeOrigin: true,
         pathRewrite: {
           '^/api': '', // 去掉path前面的/api
         },
       }
     }
   }
}