import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import React, { FC, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { rootReducer } from '@app/store'
import mockRouter from '@app/tests/mocks/mock-router'

type AllTestProvidersProps = CustomRenderOptions & WrapperProps

const AllTestProviders: FC = ({ children, query = {} }: AllTestProvidersProps) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false
  })

  return (
    <RouterContext.Provider value={{ ...mockRouter, query } as any}>
      <Provider store={store}>{children}</Provider>
    </RouterContext.Provider>
  )
}

type CustomRenderOptions = { query?: {} }

type WrapperProps = { children?: ReactNode }

export const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const wrapper = (props: WrapperProps) => <AllTestProviders {...props} {...options} />

  return render(ui, { wrapper })
}

export { customRender as render }
