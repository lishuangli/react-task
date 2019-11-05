const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, "src");
const BUILD_PATH = path.resolve(ROOT_PATH, "dist");
process.env.NODE_ENV || (process.env.NODE_ENV = "development");
const ENV = process.env.NODE_ENV;


console.log(ENV, 'webpack')


module.exports = {
    entry: {
       main: APP_PATH + "/index.js"
    },
    output: {
        filename: '[name].js',
        path: BUILD_PATH,
        publicPath: ""
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: ROOT_PATH + "/index.html",
            filename: path.resolve(BUILD_PATH) + "/index.html",
            minify:{
                removeComments:true,    
                collapseWhitespace:true    
            }

        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(ENV),
                // PUBLIC_PATH: __PUBLIC__,
            },
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|less)?$/,
                use: [
                    "style-loader",
                    "css-loader?sourceMap=true",
                    "postcss-loader",
                    `less-loader?{"sourceMap":true,"javascriptEnabled": true}`,
                    // "fit-zero-point-five-px-border-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: "url-loader?limit=2000&name=[name].[hash:5].[ext]",
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=200&minetype=image/svg+xml",
            },
            {
                test: /\.(mp3)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  name:'audios/[name].[ext]',
                  limit:2000
                }
            },    
            {
                test: /\.json/,
                use: "json-loader?name=[name].[hash:5].[ext]",
                type: "javascript/auto",
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: "manifest",
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量``
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    dead_code: true,
                },
            }),
        ],
        splitChunks: {
            chunks: 'all', 
            minSize: 30,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                node: {
                    name: 'node_vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2,
                },
                react: {
                    name: 'react_vendor',
                    test: /(react\-redux|react\-dom|prop\-types|react\-loadable|redux|react)/,
                    priority: 3,
                },
                default: {
                    name: 'common_vendor',
                    minChunks: 2,
                    priority: 1,
                    reuseExistingChunk: true
                }
            } 
        }
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    performance: {
        hints: false,
    }
 };