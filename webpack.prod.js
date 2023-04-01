const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const {InjectManifest} = require("workbox-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new InjectManifest({
            swSrc: './src/core/sw/sw.src.js',
            swDest: 'sw.js',
            exclude: [
                /\.map$/,
                /\.htaccess$/,
            ],
            maximumFileSizeToCacheInBytes: 5000000 //TODO: custom max size of ServiceWorker
        })
    ]
});