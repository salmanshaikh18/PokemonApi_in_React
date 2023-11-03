import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './PokemonDetails.css'

const PokemonDetails = () => {
  const {id} = useParams();
  console.log("id: ", id)

  const [pokemon, setPokemon] = useState({})

  const downloadPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log("high: ", response.data)
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name)
    })
  }

  useEffect(() => {
    downloadPokemon()
  }, [])
  return (
    <div className='pokemon-details-wrapper'>
      
      <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
      <img className='pokemon-details-image' src={pokemon.image} alt="" />
      <div className='pokemon-details-name'>Height: {pokemon.height}</div>
      <div className='pokemon-details-name'>Weight: {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div>
    </div>
  )
}

export default PokemonDetails