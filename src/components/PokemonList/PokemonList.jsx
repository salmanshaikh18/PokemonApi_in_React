import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './PokemonList.css'
import { useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'

const PokemonList = () => {

  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const downloadPokemons = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    const pokemonResults = response.data.results
    const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
    console.log("hey: ", pokemonResultPromise)
    const pokemonData = await axios.all(pokemonResultPromise)
    console.log(pokemonData)
    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return { 
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
        types: pokemon.types }
    })
    console.log(result)
    setPokemonList(result)
    setIsLoading(false)
    // console.log(response.data.results)
  }

  useEffect(() => {
    downloadPokemons()
  }, [])

  return (
    <div className='pokemon-list-wrapper'>
      <div>Pokemon List</div>
      {(isLoading) ? 'Loading...' :
        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} />)
      }
    </div>
  )
}

export default PokemonList