import '@testing-library/jest-dom/extend-expect'
import 'isomorphic-fetch'
import { server } from './mocks/server'

// scrollTo is not implemented in `jsdom`
const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

// mock validation schemas
jest.mock('../validation', () => ({
  addMovieSchema: undefined,
  editMovieSchema: undefined
}))

// start & stop mock service worker
beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
