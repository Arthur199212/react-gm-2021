import React, { useState, useRef } from 'react'
import { Button, Dropdown, DropdownItem, Tabs, TabItem } from '@app/components'
import { useClickOutside } from '@app/hooks'
import { OPTIONS, TABS } from '@app/tests/mock-data'
import './Filters.scss'

const Filters = () => {
  const [activeOption, setActiveOption] = useState(OPTIONS[0].name)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = () => setIsOpen(!isOpen)

  useClickOutside(dropdownRef, handleClickOutside, isOpen)

  const handleClick = (str: string) => {
    setIsOpen(false)
    setActiveOption(str)
  }

  return (
    <div className='filters-container'>
      <Tabs>
        {TABS.map(({ key, name }) => (
          <TabItem key={key}>{name}</TabItem>
        ))}
      </Tabs>
      <div className='dropdown-container'>
        <span className='label'>SORT BY</span>
        <div className='dropdown-menu'>
          <Button
            className={`dropdown-button ${isOpen ? 'open' : 'close'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {activeOption}
          </Button>
          <Dropdown elRef={dropdownRef} open={isOpen}>
            {OPTIONS.map(({ key, name }) => (
              <DropdownItem key={key} onClick={() => handleClick(name)}>
                {name}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Filters
