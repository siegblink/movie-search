import React, { useState } from 'react'

const Search = props => {
  const [searchValue, setSearchValue] = useState('')
  const [disableButton, setDisableButton] = useState(true)

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value)
    // enable the search button when the input box have a value
    setDisableButton(false)
  }

  const resetInputField = () => {
    setSearchValue('')
  }

  const callSearchFunction = e => {
    e.preventDefault()
    props.search(searchValue)
    resetInputField()
    // disable the search button after clicking the button
    setDisableButton(true)
  }

  return (
    <form className='search'>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type='text'
      />
      <input
        onClick={callSearchFunction}
        type='submit'
        value='SEARCH'
        disabled={disableButton}
      />
    </form>
  )
}

export default Search
