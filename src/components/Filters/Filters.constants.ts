import { SearchFilter, SortBy } from '@app/pages/Search/store'

export enum FiltersTestIds {
  CONTAINER = 'filters-container',
  DROPDOWN_BUTTON = 'filters-dropdown-button',
  DROPDOWN = 'filters-dropdown'
}

export const SORT_BY_OPTIONS: SortBy[] = Object.values(SortBy)

export const TABS: SearchFilter[] = Object.values(SearchFilter)
