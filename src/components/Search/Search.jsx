import React from 'react'
import './Search.css'

const Search = () => {
  const handleInput = () => {
    alert('This feature is not implemented yet, This will coming soon. Explore other features like: Scroll down and click on next button to get next 20 pokemons and you can also click on any pokemon to see their details')
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