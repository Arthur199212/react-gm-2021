import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { ErrorBoundary } from '@app/components'
import { createStore } from '@app/store'
import 'normalize.css'
import '@app/styles/index.scss'

const App = ({ Component, pageProps }: AppProps) => {
  const store = createStore(pageProps.preloadedState)

  return (
    <>
      <Head>
        <title>Movie Search App</title>
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </>
  )
}

export default App
