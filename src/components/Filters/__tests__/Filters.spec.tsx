import { fireEvent } from '@testing-library/react'
import React from 'react'
import { DropdownItemTestIds, Filters, FiltersTestIds } from '@app/components'
import { render } from '@app/tests/testing-utils'

describe('Filters Component', () => {
  const setup = () => render(<Filters />)

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
