import useDebounce from '../../hooks/useDebounce'
import './Search.css'

const Search = ({updateSearchTerm}) => {

  const deboucedCallback = useDebounce((e) => updateSearchTerm(e.target.value))

  return (
    <div className='search-wrapper'>
        <input
        id="pokemon-name-search"
        type="text"
        placeholder='Pokemon Name...'
        onChange={deboucedCallback}
        />
    </div>
  )
}

export default Search