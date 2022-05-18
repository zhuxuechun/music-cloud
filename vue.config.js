const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',//静态资源包打包为相对路径
  outputDir:'dist',//输出文件
  devServer:{
      open:false,
      host:'localhost',
      port:8080,
      // hot:true,
      proxy: {
          '/Api': {
            target:'http://localhost:3000', // 你请求的第三方接口
          //   ws:true,
            changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            pathRewrite:{  // 路径重写，
              '^/Api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.wpbom.com这个地址的时候直接写成/Api即可。
            }
          },    
          '/Wang': {
            target:"https://music.163.com", // 你请求的第三方接口
          //   ws:true,
            changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            pathRewrite:{  // 路径重写，
              '^/Wang': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.wpbom.com这个地址的时候直接写成/Api即可。
            }
          }
      },  
     
  },
  configureWebpack: {
    plugins: [
      
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      
      require('unplugin-vue-components/webpack')({ /* options */ }),
    ],
  },
})


