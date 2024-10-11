
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'client', 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'client', 'dist'),
        filename: '[fullhash].bundle.js',
        clean: true
    },
    target: 'web',
    devServer: {
        port: '4000',
        static: {
            directory: path.join(__dirname, 'client/public')
        },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback:true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|pcss)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client', 'src', 'index.tmpl.html')
        })
    ]
};
