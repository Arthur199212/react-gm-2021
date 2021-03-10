import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { ModalTestIds, MovieCard, MovieCardProps, ShowMoreButtonTestIds } from '@app/components'
import { DeleteMovieFormTestIds, EditMovieFormTestIds } from '@app/features'
import { MovieCardTestIds } from '../MovieCard.constants'
import { render } from '@app/tests/testing-utils'

describe('MovieCard Component', () => {
  const mockProps = {
    description: 'test description',
    id: 1,
    image: 'test-image-url',
    rating: 7,
    release: '2021',
    title: 'test title'
  }

  const setup = (props: MovieCardProps = mockProps) => render(<MovieCard {...props} />)

  it('should render properly', () => {
    setup()

    expect(screen.getByText(mockProps.description)).toBeInTheDocument()
    expect(screen.getByText(mockProps.release)).toBeInTheDocument()
  })

  it('should show dropdown after clicking on ShowMoreButton', async () => {
    setup()

    expect(screen.getByTestId(MovieCardTestIds.DROPDOWN).classList).not.toContain('open')

    fireEvent.click(screen.getByTestId(ShowMoreButtonTestIds.BUTTON))
    expect(screen.getByTestId(MovieCardTestIds.DROPDOWN).classList).toContain('open')

    fireEvent.click(document)
    expect(screen.getByTestId(MovieCardTestIds.DROPDOWN).classList).not.toContain('open')
  })

  it('while clicking on dropdown item Edit modal should work', async () => {
    setup()

    fireEvent.click(screen.getByText('Edit'))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).toContain('open')

    fireEvent.click(await screen.findByTestId(EditMovieFormTestIds.CLOSE_ICON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).not.toContain('open')
  })

  it('while clicking on dropdown item Delete small modal should work', async () => {
    setup()

    fireEvent.click(screen.getByText('Delete'))

    const smallModal = await screen.findByTestId(MovieCardTestIds.SMALL_MODAL)

    expect(smallModal.classList).toContain('open')

    fireEvent.click(screen.getAllByTestId(DeleteMovieFormTestIds.CLOSE_ICON).pop() as HTMLElement)

    expect(smallModal.classList).not.toContain('open')
  })
})
