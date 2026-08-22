import React, { useState } from 'react'
import Button from './Button'

const ENABLED_COLOR = '#5f27cd'
const DISABLED_COLOR = '#576574'

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value)
  }

  const resetInputField = () => {
    setSearchValue('')
  }

  // The button is greyed out and disabled until something is typed
  const isEmpty = !searchValue
  const buttonStyle = {
    borderRadius: '4px',
    border: 'none',
    backgroundColor: isEmpty ? DISABLED_COLOR : ENABLED_COLOR,
    color: 'white',
  }

  const callSearch = e => {
    e.preventDefault()
    search(searchValue)
    resetInputField()
  }

  return (
    <form className='search'>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type='text'
      />
      <Button
        inputState={isEmpty}
        style={buttonStyle}
        callSearch={callSearch}
      />
    </form>
  )
}

export default Search
