const path = require('path')

module.exports = {
  images: {
    domains: ['image.tmdb.org']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true
      }
    ]
  }
}
