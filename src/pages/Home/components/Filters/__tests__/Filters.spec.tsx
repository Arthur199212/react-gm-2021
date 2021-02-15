import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Filters } from '@app/pages/Home/components'
import { DropdownTestIds } from '@app/components/Dropdown'
import { DropdownItemTestIds } from '@app/components/DropdownItem'
import { FiltersTestIds } from '@app/pages/Home/components/Filters'

describe('Filters Component', () => {
  it('should show dropdown if ShowMoreButton was chicked', () => {
    const { getByTestId, getAllByTestId } = render(<Filters />)

    // not visible
    expect(getByTestId(DropdownTestIds.dropdown).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(FiltersTestIds.dropdownBtn))
    expect(getByTestId(DropdownTestIds.dropdown).classList).toContain('open')

    // click outside occurres -> not visible
    fireEvent.click(document)
    expect(getByTestId(DropdownTestIds.dropdown).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(FiltersTestIds.dropdownBtn))
    expect(getByTestId(DropdownTestIds.dropdown).classList).toContain('open')

    // chick on dropdown item occurres -> not visible
    fireEvent.click(getAllByTestId(DropdownItemTestIds.dropdownItem)[0])
    expect(getByTestId(DropdownTestIds.dropdown).classList).not.toContain('open')
  })
})
