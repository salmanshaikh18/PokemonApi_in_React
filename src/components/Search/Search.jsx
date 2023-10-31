import React from 'react'
import './Search.css'

const Search = () => {
  const handleInput = () => {
    alert('This feature is not implemented yet, This will coming soon')
  }
  return (
    <div className='search-wrapper'>
        <input
        id="pokemon-name-search"
        type="text"
        placeholder='Pokemon Name...'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleInput()
          }
        }}
        />

    </div>
  )
}

export default Search