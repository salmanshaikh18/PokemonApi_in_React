import React from 'react'
import Pokedex from './components/Pokedex/Pokedex'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <>
      <h1 id="pokedex-heading">
        <Link to='/'>Pokedex</Link>
        </h1>
      <CustomRoutes />
    </>
  )
}

export default App