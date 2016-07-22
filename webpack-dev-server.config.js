var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
var config = {
    //插件项
    //页面入口文件配置
    //页面入口文件配置
    entry:{
        index:path.resolve(__dirname, 'index.js')
    },
    devServer: {
        port: 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
    },
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/build/",
        filename: '[name].bundle.js'
    },
    module: {
        noParse: [],
        //加载器配置
        loaders: [{
            loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
            query:
            {
                presets: ['es2015']
            }
        },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=8192'
            }
        ]
    }
};

module.exports = config;
