const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const indexConfig = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "React Bitcoin App",
            filename: "index.html"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        compress: true,
        port: 9000
    }
};

module.exports = [indexConfig];
