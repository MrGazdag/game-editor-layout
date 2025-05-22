import path from 'path';
import SvgSpriteSheetPlugin from "svg-spritesheet-plugin";

export default {
    mode: "production",
    entry: {
        defaultStyle: {import: "./src/defaultStyle"},
        defaultTheme: {import: "./src/defaultTheme"},
        defaultIcons: {import: "./src/defaultIcons"}
    },
    target: "web",
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-typescript',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                    ]
                }
            },
            {
                resourceQuery: /resource/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/i,
                use: ['svg-sprite-loader',
                    'svgo-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    plugins: [
        new SvgSpriteSheetPlugin({
            iconsDir: "./src/icons",
            iconTypeFile: "./src/defaultIcons.ts"
        }),
    ]
};