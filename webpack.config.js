import path from 'node:path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import webpack from 'webpack';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  target:"electron-renderer",
  entry: './renderer/js/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'renderer.js',
    // chunkFormat: 'commonjs',
    libraryTarget: 'umd', // 或 'var'、'iife'
    globalObject: 'this', // 确保兼容浏览器和 Node.js
    chunkLoading: 'jsonp',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'renderer/web/index.html'),
    }),
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env' : {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['main', 'module'],
    fallback: {
      buffer: "buffer",
      assert: "assert",
      path: "path-browserify",
      fs: false,
      // os: "os-browserify/browser",
      util: "util",
    },
    alias: {
      module: false
    }
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, use: ['babel-loader', 'ts-loader'] },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext]',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceType: 'module',
          },
        },
      },
      {
        test:/\.less$/i,
        use:[
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  externals: {
  },
};
// node_modules|