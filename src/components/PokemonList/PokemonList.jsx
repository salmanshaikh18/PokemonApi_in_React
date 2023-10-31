import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './PokemonList.css'
import { useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'

const PokemonList = () => {

  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon/'

  const downloadPokemons = async () => {
    const response = await axios.get(POKEDEX_URL) // this downloads list of 20 pokemons
    console.log("response.data: ", response.data) 

    const pokemonResults = response.data.results // we get the array of pokemons (name, link for details of pokemons) from result
    console.log('pokemonResults: ', pokemonResults)

    // iterating over the array of pokemons, and using their url, to create an array of promises 
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)) // array of 20 pokemon detailed data
    console.log("hey: ", pokemonResultPromise)

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise)
    console.log(pokemonData)

    // now iterate on the data of each pokemon, and extract id, name, image, types
    const pokeLIstResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return { 
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
        types: pokemon.types }
    })
    console.log(pokeLIstResult)

    setPokemonList(pokeLIstResult)
    setIsLoading(false)
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