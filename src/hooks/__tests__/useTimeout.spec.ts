import { renderHook } from '@testing-library/react-hooks'
import { useTimeout } from '@app/hooks'

describe('useTimeout hook', () => {
  const callback = jest.fn()
  it('should work', async () => {
    jest.useFakeTimers()

    renderHook(() => useTimeout(callback, 5))

    expect(callback).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(5)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should work with NO delay provided', async () => {
    jest.useFakeTimers()

    renderHook(() => useTimeout(callback))

    expect(callback).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(5)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
