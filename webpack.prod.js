const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');





module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: "[name].[chunkhash:5].bundle.js",
        chunkFilename: "[id].[chunkhash:5].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|less)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?sourceMap=true",
                    "postcss-loader",
                    `less-loader?{"sourceMap":true,"javascriptEnabled": true}`,
                    // "fit-zero-point-five-px-border-loader",
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].bundle.css",
            chunkFilename: "[id].[chunkhash].bundle.css"
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                // 避免 cssnano 重新计算 z-index
                safe: true,
                // cssnano 集成了autoprefixer的功能
                // 会使用到autoprefixer进行无关前缀的清理
                // 关闭autoprefixer功能
                // 使用postcss的autoprefixer功能
                autoprefixer: false
            },
            canPrint: true
        }),
        // new BundleAnalyzerPlugin()
    ]
});