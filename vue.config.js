// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require("compression-webpack-plugin")
console.log(process.env.NODE_ENV)

const javaIp='http://192.168.123.175:9854/'
module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : "/vue-admin-work-x",
  // publicPath: '/iso15189',
  publicPath: '/',
  outputDir: "dist",
  assetsDir: "ilater",
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: 9643,
    open: false,
    disableHostCheck: true,
    proxy: {
      '/menu': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/role': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/user': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/material': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/item': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/dictionary': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/itemCategory': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/proveFile': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/laboratory': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/checkItem': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/checkMaintain': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
      '/checkManage': {
        target: javaIp,
        changeOrigin: true, // 是否改变域名
        ws: true
      },
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css/,
          threshold: 50240,
          deleteOriginalAssets: false
        }))
    }
  }
};
