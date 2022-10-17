const path = require("path");

let experienceFolder = "experience_A";

module.exports = {
    mode: "development",
    entry: {
        bundle: `./src/${experienceFolder}/global.ts`,
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/dist"),
        publicPath: "/dist/",
        clean: true,
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
    plugins: [],
};