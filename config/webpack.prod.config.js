const merge = require('webpack-merge');
const base = require('./webpack.base.config')('production');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独把 CSS 文件分离出来

module.exports = merge(base, {
    mode: 'production',
    optimization: {
        // 代码分割
        // splitChunks: {
        //   chunks: 'all', // 分割所有代码，包括同步和异步的代码
        //   cacheGroups: {
        //     vendors: {
        //       name: 'vendors', // 分割代码的名称
        //     }
        //   }
        // }
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            jquery: {
                name: 'jquery',
                priority: 15,
                test: /[\\/]node_modules[\\/]jquery[\\/]/,
            },
            lodash: {
              name: 'lodash', // 单独将 lodash 拆包
              test: /[\\/]node_modules[\\/]lodash[\\/]/,
              priority: 10 // 优先级要大于 commons 不然会被打包进 commons
            },
            commons: {
              name: 'commons',
              minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
              minChunks: 2, // 最小公用次数
              priority: 5, // 优先级
              reuseExistingChunk: true // 公共模块必开启
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
          }),
          new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
          }),
    ]
});
