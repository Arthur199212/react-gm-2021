export const { APP_PORT = 3000, NODE_ENV } = process.env

export const isProd = NODE_ENV === 'production'
