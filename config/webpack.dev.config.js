const merge = require('webpack-merge');
const base = require('./webpack.base.config')('development');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map', // 开启调试
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        hot: true, // 热重载
        overlay: true, // 代码有错，会在浏览器页面显示
        proxy: {
            // 跨域代理转发
        '/comments': {
            target: 'https://m.weibo.cn',
            changeOrigin: true,
            logLevel: 'debug',
            headers: {
                Cookie: ''
            }
        }
      },
      historyApiFallback: {
        rewrites: [{
            from: /.*/,
            to: './index.html',
        }]
      },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热部署模块
        new webpack.NamedModulesPlugin(),
    ]
});
