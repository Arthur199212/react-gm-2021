import React, { useState, useRef } from 'react'
import { Button, Dropdown, DropdownItem, Tabs, TabItem } from '@app/components'
import { useClickOutside } from '@app/hooks'
import { toKebabCase } from '@app/utils'
import { FiltersTestIds, SORT_BY_OPTIONS, TABS } from './Filters.constants'
import './Filters.scss'

type FilterProps = {
  filter: string
  onFilterSelect: (filter: string) => void
  onSortBySelect: (sortBy: string) => void
  sortBy: string
}

export const Filters = ({ filter, onFilterSelect, onSortBySelect, sortBy }: FilterProps) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = () => setIsOpen(!isOpen)

  useClickOutside(dropdownRef, handleClickOutside, isOpen)

  const handleClick = (str: string) => {
    setIsOpen(false)
    onSortBySelect(str)
  }

  return (
    <div className='filters-container'>
      <Tabs>
        {TABS.map(name => (
          <TabItem
            key={`tab-${name}`}
            active={name === filter}
            onClick={() => onFilterSelect(name)}
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
