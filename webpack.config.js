const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const MODE = process.env.R_MODE;
const RUN_MODE = process.env.R_RUN_MODE;
const TARGET = process.env.R_TARGET;
console.log('실행 모드: ', MODE);
console.log('런타임 실행 환경: ', RUN_MODE);
console.log('런타임 실행 타겟: ', TARGET);

const plugins = [
  new webpack.DefinePlugin({
    'process.env.locheck': JSON.stringify({
      R_RUN_MODE: RUN_MODE,
    }),
  }),
];

if (TARGET === 'web') {
  plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      publicPath: '/',
    }),
  );
}

const devTool = MODE === 'production' ? {} : { devtool: 'source-map' };

const entry =
  TARGET === 'web'
    ? path.resolve(__dirname, 'src/renderer/index.tsx')
    : path.resolve(__dirname, 'src/main/main.ts');

const outputPath = `dist-${TARGET}`;

console.log(entry);

const result = {
  mode: MODE,
  target: TARGET,
  entry,
  output: {
    path: path.resolve(__dirname, outputPath),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    host: 'localhost',
    port: 9000,
    historyApiFallback: true,
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins,
};

module.exports = { ...result, ...devTool };
