import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import React, { FC, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { rootReducer, RootState } from '@app/store'
import mockRouter from '@app/tests/mocks/mock-router'

type AllTestProvidersProps = CustomRenderOptions & WrapperProps

const AllTestProviders: FC = ({
  children,
  query = mockRouter.query,
  state
}: AllTestProvidersProps) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false,
    preloadedState: state
  })

  return (
    <RouterContext.Provider value={{ ...mockRouter, query } as any}>
      <Provider store={store}>{children}</Provider>
    </RouterContext.Provider>
  )
}

type CustomRenderOptions = {
  query?: {}
  state?: RootState
}

type WrapperProps = { children?: ReactNode }

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const wrapper = (props: WrapperProps) => <AllTestProviders {...props} {...options} />

  return render(ui, { wrapper })
}

export { customRender as render }
