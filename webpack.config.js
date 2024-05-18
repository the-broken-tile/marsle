const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }, {
                test: /\.json$/,
                type: "javascript/auto",
                use: "json-loader",
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                use: ["css-loader"],
            },
        ],
    },
    resolve: {
        extensions:  [".ts", ".tsx", ".js", ".jsx"],
        fallback: {
            crypto: false,
        },
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'styles.css', to: '.' },
            ],
        }),
    ],
    devServer: {
        contentBase: "./dist",
    },
};
