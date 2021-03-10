import { NextRouter } from 'next/router'

const mockRouter: NextRouter = {
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  back: () => Promise.resolve(true),
  beforePopState: () => Promise.resolve(true),
  isFallback: false,
  events: {
    on: () => {},
    off: () => {},
    emit: () => {}
  },
  isLocaleDomain: false,
  isReady: false,
  isPreview: false
}

export default mockRouter
