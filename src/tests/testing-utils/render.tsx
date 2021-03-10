import { render } from '@testing-library/react'
import React, { FC, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { rootReducer, RootState } from '@app/store'
import { createMemoryHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'

type AllTestProvidersProps = {
  children?: ReactNode
  route?: string
}

const AllTestProviders: FC = ({ children, route = '/' }: AllTestProvidersProps) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false
  })
  const history = createMemoryHistory()

  history.push(route)

  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )
}

type CustomRenderOptions = {
  initialState?: RootState
  route?: string
}

export const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const wrapper = (props: { children?: ReactNode }) => <AllTestProviders {...props} {...options} />

  return render(ui, { wrapper })
}

export { customRender as render }
