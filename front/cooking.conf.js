var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
    port: 8081,
    publicPath: '/',
    proxy:{
      '*':{
        target:'http://localhost:3000',
        chageOrigin:true,
        secure:false,
        host:"http://localhost:3000"
      }
    }
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/public/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  static: true,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src'),
    'vue$': 'vue/dist/vue.common.js',
    'pages':path.join(__dirname,'src/pages'),
    'components':path.join(__dirname,'src/components'),
    'style':path.join(__dirname,'src/assets/less')
  },
  extends: ['vue2', 'less', 'autoprefixer']
});

cooking.add('loader.vue',{
  test: /\.vue$/,
  loaders: ['vue-loader']
});

cooking.add('loader.js',{
  test: /\.js$/,
  loaders: ['babel-loader'],
  exclude: /node_modules/
});

cooking.add('loader.less',{
  test: /\.less$/,
  loaders: ['less-loader','style-loader','css-loader']
});

module.exports = cooking.resolve();
