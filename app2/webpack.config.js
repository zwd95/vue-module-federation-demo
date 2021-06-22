const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
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
    port: 8082,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },

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

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new ModuleFederationPlugin({
      name: 'app2',

      filename: 'remoteEntry.js',

      remotes: {
        app1: 'app1@http://localhost:8080/remoteEntry.js',
        common: 'common@http://localhost:8084/remoteEntry.js'
      },

      exposes: {
        './Button': './src/components/button.vue'
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
