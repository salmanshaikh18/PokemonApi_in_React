import React from 'react'
import './Pokemon.css'

const Pokemon = ({ name, image }) => {
  return (
    <div className='pokemon'>
      <div><h2 id='pokemon-name'>{name}</h2></div>
      <div id='image-box'>
        <img id="pokemon-image" src={image} alt="" />
      </div>

    </div>
  )
}

export default Pokemon