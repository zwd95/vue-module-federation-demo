const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('path')
const { ModuleFederationPlugin } = require('webpack').container

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',

  entry: './src/main.js',

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.vue', '.js']
  },

  devServer: {
    port: 8084,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    // new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new ModuleFederationPlugin({
      name: 'common',

      filename: 'remoteEntry.js',

      exposes: {
        './vue': './node_modules/vue',
        './element-ui': './node_modules/element-ui',
        './element-ui/lib/theme-chalk/index.css': './node_modules/element-ui/lib/theme-chalk/index.css'
      },

      // shared: {
      //   'vue': {
      //     singleton: true
      //   },

      //   'element-ui': {
      //     singleton: true
      //   }
      // }
    })
  ]
}
