const webpack = require('webpack')
const path = require('path')

// 是否是watch模式，调试专用
const isWatch = process.env.WATCH === 'true'

module.exports = {
  mode: isWatch ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    publicPath: '/',
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  externals: isWatch ? {} : {
    react: 'react',
    'react-dom': 'react-dom',
    mobx: 'mobx',
    'mobx-react': 'mobx-react',
    lodash: 'lodash',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /(fontawesome-webfont|glyphicons-halflings-regular|iconfont)\.(woff|woff2|ttf|eot|svg)($|\?)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'font/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\\svg\\(\w|\W)+\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              expandProps: 'start',
              svgProps: {
                fill: 'currentColor',
                // className 冗余
                className:
                  "{'gm-svg-icon t-svg-icon m-svg-icon ' + (props.className || '')}",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0',
    inline: false,
    disableHostCheck: true,
    proxy: {
      '/gm_account/*': {
        target: 'http://station.env-lyf.dev.k8s.guanmai.cn',
        changeOrigin: true,
      },
    },
  },
}
