var path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
    MODE = 'development',
} = process.env;

module.exports = {
    mode: MODE,
    module: {
        rules: [
            { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
            { test: /\.tsx?$/, loader: "babel-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
        })
    ],
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'dist'),
        proxy: {
            '/api/': {
                target: 'http://localhost:8000',
                pathRewrite: {'^/api/' : ''},
                secure: false,
                changeOrigin: true
            }
        },
        historyApiFallback: true,
    }
};