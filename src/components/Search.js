import React, { useState } from 'react'
import Button from './Button'

const Search = ({ search }) => {
  const enabledStyle = {
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#5f27cd',
    color: 'white',
  }

  const disabledStyle = {
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#576574',
    color: 'white',
  }

  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value)
  }

  const resetInputField = () => {
    setSearchValue('')
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
      {searchValue ? (
        <Button
          inputState={false}
          style={enabledStyle}
          callSearch={callSearch}
        />
      ) : (
        <Button
          inputState={true}
          style={disabledStyle}
          callSearch={callSearch}
        />
      )}
    </form>
  )
}

export default Search
