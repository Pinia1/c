// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    output: {
        filename: 'sdk.js', // 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        }),
    ],
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /.(css|less)$/, //匹配 css和less 文件
                use: [
                    'style-loader',
                    'css-loader',
                    // 新增
                    {
                        loader: 'postcss-loader',
                        options: {

                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                }
            },
        ]
    },

}