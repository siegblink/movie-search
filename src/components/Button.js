import React from 'react'

export default function Button({ inputState, style, callSearch }) {
  return (
    <input
      onClick={callSearch}
      type='submit'
      value='SEARCH'
      disabled={inputState}
      style={style}
    />
  )
}
