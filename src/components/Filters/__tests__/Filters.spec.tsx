import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { DropdownItemTestIds, Filters, FiltersTestIds } from '@app/components'
import { store } from '@app/store'

describe('Filters Component', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    )

  it('should show dropdown if ShowMoreButton was chicked', () => {
    const { getByTestId, getAllByTestId } = setup()

    // not visible
    expect(getByTestId(FiltersTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(FiltersTestIds.DROPDOWN_BUTTON))
    expect(getByTestId(FiltersTestIds.DROPDOWN).classList).toContain('open')

    // click outside occurres -> not visible
    fireEvent.click(document)
    expect(getByTestId(FiltersTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(FiltersTestIds.DROPDOWN_BUTTON))
    expect(getByTestId(FiltersTestIds.DROPDOWN).classList).toContain('open')

    // chick on dropdown item occurres -> not visible
    fireEvent.click(getAllByTestId(DropdownItemTestIds.DROPDOWN_ITEM)[0])
    expect(getByTestId(FiltersTestIds.DROPDOWN).classList).not.toContain('open')
  })
})
