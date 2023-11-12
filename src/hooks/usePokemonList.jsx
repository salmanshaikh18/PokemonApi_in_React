import axios from "axios"
import { useEffect, useState } from "react"


const usePokemonList = () => {

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
    nextUrl: '',
    prevUrl: '',
  })

  const downloadPokemons = async () => {
    // setIsLoading(true)


    // iterating over the array of pokemons, and using their url, to create an array of promises 
    // that will download those 20 pokemons


    setPokemonListState((state) => ({ ...state, isLoading: true }))
    const response = await axios.get(pokemonListState.pokedexUrl) // this downloads list of 20 pokemons

    const pokemonResults = response.data.results // we get the array of pokemons (name, link for details of pokemons) from result
    console.log('pokemonResults: ', pokemonResults)

    // console.log("response.data: ", response.data)
    console.log("res: ", response.data.pokemon)
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous
    }))
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
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeLIstResult,
      isLoading: false
    }))


  }

  useEffect(() => {
    downloadPokemons()
  }, [pokemonListState.pokedexUrl])

  return [pokemonListState, setPokemonListState]
}

export default usePokemonList