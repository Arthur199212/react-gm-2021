import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import { cleanup as cleanupHooks } from '@testing-library/react-hooks'

afterEach(() => {
  cleanup()
  cleanupHooks()
})
