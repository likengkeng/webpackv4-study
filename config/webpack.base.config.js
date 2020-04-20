const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独把 CSS 文件分离出来

const cssLoader = [
  'style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader'
];

const cssExtractLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  'css-loader',
  'postcss-loader',
  'sass-loader'
]

module.exports = env => {
  const isProd = env === 'production';
  const config = {
    entry: [
      'core-js/modules/es.array.iterator', //解决IE11 (Dynamic import does not work, error: Unhandled promise rejectionTypeError: Target is not iterable)
     './src/index.js'
   ],
   output: {
     publicPath: isProd ? './' : '/',
     path: path.resolve(__dirname, '../dist'),
     filename: '[name].bundle.js', // 代码打包后的文件名
     chunkFilename: '[name].js' // 代码拆分后的文件名
   },
   resolve: {
     alias: {
       $: path.resolve(__dirname, 'node-modules/dist/jquery.min.js')
     }
   },
   plugins: [
     new CleanWebpackPlugin(), // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
     new HtmlWebpackPlugin({
       title: 'webpack4学习',
       minify: {
         // 压缩 HTML 文件
         removeComments: true, // 移除 HTML 中的注释
         collapseWhitespace: true, // 删除空白符与换行符
         minifyCSS: true // 压缩内联 css
       },
       filename: 'index.html', // 生成后的文件名
       template: 'index.html', // 根据此模版生成 HTML 文件
     }),
     new webpack.ProvidePlugin({
       $: 'jquery', // npm
       // jQuery: 'jQuery' // 本地Js文件
     })
   ],
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
         },
       },
       {
         test: /\.(scss|css)$/, // 针对 .scss 或者 .css 后缀的文件设置 loader
         use: isProd ? cssExtractLoader : cssLoader,
         // use: [
         //   {
         //     loader: MiniCssExtractPlugin.loader
         //   },
         //   {
         //     loader: 'css-loader',
         //     options: {
         //       importLoaders: 2 // 在一个 css 中引入了另一个 css，也会执行之前两个 loader，即 postcss-loader 和 sass-loader
         //     }
         //   },
         //   // 'css-loader',
         //   'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
         //   'sass-loader' // 使用 sass-loader 将 scss 转为 css
         // ]
       },
       {
         test: /\.(png|jpg|jpeg|gif|jfif)$/,
         use: [
           {
             loader: 'url-loader',
             options: {
               name: '[name]-[hash:5].min.[ext]',
               outputPath: 'images/', // 输出到imgages文件夹
               limit: 30000 // 把小于30kb的文件转成Base64的格式
             }
           }
         ]
       }
     ]
   }
  };
  return config;
};
