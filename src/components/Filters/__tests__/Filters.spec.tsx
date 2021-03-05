import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  DropdownTestIds,
  DropdownItemTestIds,
  Filters,
  FiltersTestIds,
  SORT_BY_OPTIONS,
  TABS
} from '@app/components'

describe('Filters Component', () => {
  it('should show dropdown if ShowMoreButton was chicked', () => {
    const { getByTestId, getAllByTestId } = render(
      <Filters
        filter={TABS[0]}
        onFilterSelect={() => {}}
        onSortBySelect={() => {}}
        sortBy={SORT_BY_OPTIONS[0]}
      />
    )

    // not visible
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(FiltersTestIds.DROPDOWN_BUTTON))
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).toContain('open')

    // click outside occurres -> not visible
    fireEvent.click(document)
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(FiltersTestIds.DROPDOWN_BUTTON))
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).toContain('open')

    // chick on dropdown item occurres -> not visible
    fireEvent.click(getAllByTestId(DropdownItemTestIds.DROPDOWN_ITEM)[0])
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')
  })
})
