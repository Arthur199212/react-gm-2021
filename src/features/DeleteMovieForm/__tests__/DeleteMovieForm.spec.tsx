import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { DeleteMovieForm, DeleteMovieFormTestIds } from '@app/features'
import { render } from '@app/tests/testing-utils'
import { server } from '@app/tests/mocks/server'
import { rest } from 'msw'
import { API_URL } from '@app/config'

describe('DeleteMovieForm Component', () => {
  const onClose = jest.fn()
  const movieIdMock = '1'
  const setup = () =>
    render(<DeleteMovieForm movieId={movieIdMock} onClose={onClose} open={true} />)

  it('close icon should work', () => {
    setup()

    fireEvent.click(screen.getByTestId(DeleteMovieFormTestIds.CLOSE_ICON))
    expect(onClose).toBeCalled()
  })

  it('should work properly', async () => {
    setup()

    fireEvent.click(screen.getByTestId(DeleteMovieFormTestIds.CONFIRM_BUTTON))

    expect(await screen.findByTestId(DeleteMovieFormTestIds.SUCCESS_ICON)).toBeInTheDocument()
  })

  it('should work properly if error occurs', async () => {
    server.use(
      rest.delete(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    setup()

    fireEvent.click(screen.getByTestId(DeleteMovieFormTestIds.CONFIRM_BUTTON))

    const errorMessage = await screen.findByText(/something went wrong/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
