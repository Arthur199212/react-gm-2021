const getClientConfig = require('./webpack.client.config')
const getServerConfig = require('./webpack.server.config')

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

const ROOT_PATH = '../../'

const clientConfig = getClientConfig({ ROOT_PATH, isProd })
const serverConfig = getServerConfig({ ROOT_PATH, isProd })

module.exports = [serverConfig, clientConfig]
