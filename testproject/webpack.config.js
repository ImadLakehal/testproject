const path = require('path')
const webpack = require('webpack')

let config = {
    entry: './src/main.tsx',  //   virtual DO
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    resolve: {  //   by default it should looks after js then ts then tsx
        extensions: ['.js','.ts','.tsx']
    },
    devServer: { // just to remove some information displayed during the compilation
        noInfo: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: 'tslint-loader',
                enforce: 'pre',
                exclude: [/node_modules/]
            },
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }

        })
    ]
}

module.exports = config;