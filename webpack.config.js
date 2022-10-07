const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        bundle: "./src/app.ts",
    },
    output: {
        filename: "[name].js",
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
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [],
};