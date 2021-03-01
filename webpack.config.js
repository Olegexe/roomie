const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, '/src'),
    dist: path.join(__dirname, '/dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    watch: true,
    entry: "./src/index.js",
    output: {
        filename: `${PATHS.assets}js/bundle.[contenthash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    devServer: {
        contentBase: PATHS.dist,
        port: 8081
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node-modules|bower-components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './assets/img/[name].[ext]'
                }
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        // sourceMap: true
                    },
                    {
                        loader: 'sass-loader',
                        // sourceMap: true
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            ]
        }),


        // ...PAGES.map(page => new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/${page}`,
        //     filename: `./${page.replace(/\.pug$/, '.html')}`
        // })),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}index.pug`,
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}about/about.pug`,
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}store/store.pug`,
            filename: 'store.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),
    ]
};