const NodemonPlugin = require('nodemon-webpack-plugin')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = ({ ROOT_PATH, isProd }) => {
  const DIST_SERVER_PATH = path.resolve(__dirname, ROOT_PATH, 'dist/server')

  return {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },
    context: path.resolve(__dirname, ROOT_PATH),
    entry: './src/server/index.ts',
    mode: isProd ? 'production' : 'development',
    externals: [nodeExternals()],
    devtool: isProd ? false : 'cheap-module-source-map',
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.ts', '.js']
    },
    output: {
      path: DIST_SERVER_PATH,
      filename: 'index.js',
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
    },
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      !isProd &&
        new NodemonPlugin({
          script: DIST_SERVER_PATH,
          watch: DIST_SERVER_PATH
          // nodeArgs: ['--inspect']
        })
    ].filter(Boolean)
  }
}
