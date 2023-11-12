import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './PokemonList.css'
import { useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'
import usePokemonList from '../../hooks/usePokemonList'

const PokemonList = () => {

  const [ pokemonListState, setPokemonListState ] = usePokemonList(false)

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