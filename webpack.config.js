const path = require("path");

const currDir = process.cwd();

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(currDir + "/src/global.ts"),
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/dist"),
        publicPath: "/dist/",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules\/(?!(@bluefits\/pers-tsc-gen)\/).*/,
                use: ['babel-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(@bluefits\/pers-tsc-gen)\/).*/,
                use: ['babel-loader'],
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules\/(?!(@bluefits\/pers-tsc-gen)\/).*/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        }
                    }
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.svg/i,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack"],
            }
        ],
    },
    resolve: {
        extensions: ['*', ".ts", ".tsx", ".js", '.jsx'],
    },
    plugins: [],
};