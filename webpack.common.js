const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const plugins = [
    new MiniCssExtractPlugin({
        filename:'static/css/[name].css',
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
    }),
    new CopyPlugin({

        patterns: [
            {
                from: "./public/*",
                globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: ["**/index.html"],
                },
                to({context, absoluteFilename}) {
                    return "[name][ext]";
                },
            },
            {
                from: "./public/favicon/*",
                to({context, absoluteFilename}) {
                    return "favicon/[name][ext]";
                },
            }
        ],
    })
];

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "static/js/[name].js",
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    },
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {publicPath: '../../'}
                },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/images',
                        },
                    },
                ],

            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/fonts',
                    },
                }],
            }
        ]
    },
    plugins: plugins,
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {

                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },

            },
        },
    },

};