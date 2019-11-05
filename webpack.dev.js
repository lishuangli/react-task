const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const chalk = require('chalk');
const PORT = process.env.PORT || 3000;


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        useLocalIp: true,
        historyApiFallback: true,
        port: PORT,
        hot: true,
        inline: true,
        open: true,
        disableHostCheck: true,
        host: "0.0.0.0",
        // proxy: {
        //   "/myWallet/pay/*": {
        //     changeOrigin: true,
        //     target: "http://10.7.14.72/",
        //     secure: false
        //   }
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProgressPlugin((percentage, msg) => {
            const stream = process.stderr;
            if (stream.isTTY && percentage < 1) {
                stream.cursorTo(0);
                stream.write(`📦  ${chalk.magenta(msg)} ${chalk.magenta(~~(percentage * 100) + "%")}`);
                stream.clearLine(1);
            } else if (percentage === 1) {
                console.log(chalk.green("\nwebpack: bundle build is now finished."));
            }
        }),
    ]
});