import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './PokemonList.css'
import { useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'

const PokemonList = () => {

  // const [pokemonList, setPokemonList] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // const [POKEDEX_URL, setPOKEDEX_URL] = useState('https://pokeapi.co/api/v2/pokemon/')

  // const [nextUrl, setNextUrl] = useState()
  // const [prevUrl, setPrevUrl] = useState()

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
    nextUrl: '',
    prevUrl: ''
  })

  const downloadPokemons = async () => {
    // setIsLoading(true)
    setPokemonListState( (state) => ({ ... state, isLoading: true }))
    const response = await axios.get(pokemonListState.pokedexUrl) // this downloads list of 20 pokemons

    const pokemonResults = response.data.results // we get the array of pokemons (name, link for details of pokemons) from result
    console.log('pokemonResults: ', pokemonResults)

    console.log("response.data: ", response.data)
    setPokemonListState( (state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous
    }))

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
        types: pokemon.types
      }
    })

    // console.log(pokeLIstResult)
    setPokemonListState( (state) => ({
      ...state,
      pokemonList: pokeLIstResult,
      isLoading: false
    }))

  }

  useEffect(() => {
    downloadPokemons()
  }, [pokemonListState.pokedexUrl])

  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-wrapper'>
        {console.log(pokemonListState.isLoading)}
        {(pokemonListState.isLoading) ? 'Loading...' :
          pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />)
        }
      </div>

      <div className='controls'>
        <button disabled={pokemonListState.prevUrl === null} onClick={() => {
          const urlToSet = pokemonListState.prevUrl
          setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet})
        }}
        >Previous</button>
        <button disabled={pokemonListState.nextUrl === null} onClick={() => {
          const urlToSet = pokemonListState.nextUrl
          setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet})
        } }>Next</button>

      </div>
    </div>
  )
}

export default PokemonList