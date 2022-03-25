const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';

  const config = {
    mode: argv.mode || 'development',
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProd ? 'index.js' : 'bundle-[hash].js',
      library: {
        name: 'activity',
        type: 'window',
        export: 'default',
      }
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      liveReload: true,
      compress: true,
      port: 3000,
      hot: false,
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: isProd ? 'tsconfig.prod.json' : 'tsconfig.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'example/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
  };

  if (!isProd) {
    config.devtool = 'inline-source-map';
  }

  return config;
};
