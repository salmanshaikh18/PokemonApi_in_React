import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'

const Pokemon = ({ name, image, id }) => {
  return (
    <div className='pokemon'>
      <Link to={`/pokemon/${id}`}>
        <div><h2 id='pokemon-name'>{name}</h2></div>
        <div id='image-box'>
          <img id="pokemon-image" src={image} alt="" />
        </div>
      </Link>


    </div>
  )
}

export default Pokemon