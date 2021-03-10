import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { INITIAL_APP_STATE, RootState, RootThunk } from '@app/store'
import { AsyncThunkAction } from '@reduxjs/toolkit'

const middlewares: Middleware[] = [thunk]

export const setupStore = (initialState: RootState = INITIAL_APP_STATE) =>
  configureStore<RootState, AsyncThunkAction<void, void, RootThunk>>(middlewares)(initialState)
