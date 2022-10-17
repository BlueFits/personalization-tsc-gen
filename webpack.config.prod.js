const CleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        bundle: "./src/experience_A/global.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname + "/dist"),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['*', ".ts", ".tsx", ".js", '.jsx'],
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "[name].html",
            template: "./template.ejs",
            inject: false,
            minify: true,
        }),     
        new InlineSourceWebpackPlugin({
            compress: true,
            rootpath: './',
            noAssetMatch: 'warn'
        })     
    ],
};