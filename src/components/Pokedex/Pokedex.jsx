import Search from '../Search/Search'
import './Pokedex.css'
import PokemonList from '../PokemonList/PokemonList'
import PokemonDetails from '../PokemonDetails/PokemonDetails'
import { useState } from 'react'

const Pokedex = () => {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='pokedex-wrapper'>
        <Search updateSearchTerm={setSearchTerm} />
        { (!searchTerm) ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} />}
    </div>
  )
}

export default Pokedex