import { useParams } from 'react-router-dom'
import './PokemonDetails.css'
import usePokemonDetails from '../../hooks/usePokemonDetails';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id)

  return (
    <div className='pokemon-details-wrapper'>

      <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
      <img className='pokemon-details-image' src={pokemon.image} alt="" />
      <div className='pokemon-details-name'>Height: {pokemon.height}</div>
      <div className='pokemon-details-name'>Weight: {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div>

      {
        pokemon.types && pokemon.similarPokemons && 
        <div id="similarPokemonsWrapper">
          <h2 style={{marginBottom: '20px', color: 'gray', textDecoration: 'underline', cursor: 'pointer'}} >more {pokemon.types[0]} type pokemons</h2>

          <ul id="similarPokemonsLists">
            {pokemon.similarPokemons.map((p) => <li id="similarPokemons" key={p.pokemon.id}>{p.pokemon.name}</li>)
            }
          </ul>
        </div>
      }

    </div>
  )
}

export default PokemonDetails