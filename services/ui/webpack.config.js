var path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
    MODE = 'development',
} = process.env;

module.exports = {
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
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