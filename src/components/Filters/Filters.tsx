import React, { useState, useRef, useCallback } from 'react'
import { Button, Dropdown, DropdownItem, Tabs, TabItem } from '@app/components'
import { useAppDispatch, useAppSelector, useClickOutside } from '@app/hooks'
import {
  selectSearchFilter,
  selectSortBy,
  setFilter,
  setSortBy,
  SortBy
} from '@app/pages/Search/store'
import { toKebabCase } from '@app/utils'
import { FiltersTestIds, SORT_BY_OPTIONS, TABS } from './Filters.constants'
import './Filters.scss'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectSearchFilter)
  const sortBy = useAppSelector(selectSortBy)

  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = useCallback(() => setIsOpen(false), [])

  useClickOutside(dropdownRef, handleClickOutside, isOpen)

  const handleClick = (str: SortBy) => {
    setIsOpen(false)
    dispatch(setSortBy(str))
  }

  return (
    <div className='filters-container' data-testid={FiltersTestIds.CONTAINER}>
      <Tabs>
        {TABS.map(name => (
          <TabItem
            key={`tab-${name}`}
            active={name === filter}
            onClick={() => dispatch(setFilter(name))}
          >
            {name}
          </TabItem>
        ))}
      </Tabs>
      <div className='dropdown-container'>
        <span className='label'>SORT BY</span>
        <div className='dropdown-menu'>
          <Button data-testid={FiltersTestIds.DROPDOWN_BUTTON} onClick={() => setIsOpen(!isOpen)}>
            {sortBy}
          </Button>
          <Dropdown elRef={dropdownRef} open={isOpen}>
            {SORT_BY_OPTIONS.map(optionName => (
              <DropdownItem
                key={`dropdown-${toKebabCase(optionName)}`}
                onClick={() => handleClick(optionName)}
              >
                {optionName}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
