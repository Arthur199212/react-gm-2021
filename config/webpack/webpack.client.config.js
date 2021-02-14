const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: '> 0.25%, not dead'
        }
      ]
    ]
  }
}

const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[hash].[ext]',
    outputPath: 'assets'
  }
}

module.exports = ({ ROOT_PATH, isProd }) => {
  const DIST_CLIENT_PATH = path.resolve(__dirname, ROOT_PATH, './dist/client')

  return {
    target: 'web',
    context: path.resolve(__dirname, ROOT_PATH),
    entry: './src/index.tsx',
    mode: isProd ? 'production' : 'development',
    devtool: !isProd && 'cheap-module-source-map',
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
      path: DIST_CLIENT_PATH,
      filename: 'index.js',
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
    },
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [new TerserPlugin()] : []
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            babelLoader,
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: [babelLoader]
        },
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              }
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  includePaths: [path.resolve(__dirname, ROOT_PATH, './src/styles')]
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [fileLoader]
        },
        {
          test: /\.(eot|woff|woff2|ttf)([?]?.*)$/,
          use: [fileLoader]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'index.css'
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, ROOT_PATH, './src/assets/pics/favicon.png'),
        template: path.resolve(__dirname, ROOT_PATH, './src/index.html')
      })
    ]
  }
}
