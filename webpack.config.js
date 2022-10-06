const CleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        bundle: "./src/app.ts",
        // reload: "./services/LiveReload/index.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname + "/dist/temp"),
        publicPath: "/dist/"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/')
        }
    },
    // devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index-pre.html",
            template: "./template.ejs",
            inject: false,
            minify: false,
        }),        
    ],
};