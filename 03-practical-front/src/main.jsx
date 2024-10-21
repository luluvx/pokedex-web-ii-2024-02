import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import TipoDashBoard from './pages/admin/tipos/TipoDashboard.jsx'
import { RouterProvider } from 'react-router-dom/dist/index.js'
import FormTipo from './pages/admin/tipos/FormTipo.jsx'
import PhotoTipo from './pages/admin/tipos/PhotoTipo.jsx'
import HabilidadDashboard from './pages/admin/habilidades/HabilidadDashboard.jsx'
import FormHabilidad from './pages/admin/habilidades/FormHabilidad.jsx'
import PokemonDashboard from './pages/admin/pokemons/PokemonDashboard.jsx'
import FormPokemon from './pages/admin/pokemons/FormPokemon.jsx'
import PhotoPokemon from './pages/admin/pokemons/PhotoPokemon.jsx'
import DetailPokemonAdmin from './pages/admin/pokemons/DetailPokemonAdmin.jsx'
import PokemonList from './pages/pokemons/PokemonList.jsx'
import DetailPokemon from './pages/pokemons/DetailPokemon.jsx'
import FormEvolucion from './pages/admin/pokemons/FormEvolucion.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin/tipos',
    element: <TipoDashBoard />,
  },
  {
    path: '/admin/tipos/create',
    element: <FormTipo />,
  },
  {
    path: '/admin/tipos/edit/:id',
    element: <FormTipo />,
  },
  {
    path: '/admin/tipos/:id/photo',
    element:<PhotoTipo />,
  },
  {
    path: '/admin/habilidades',
    element: <HabilidadDashboard />,
  },
  {
    path: '/admin/habilidades/create',
    element: <FormHabilidad />,
  },
  {
    path: '/admin/habilidades/edit/:id',
    element: <FormHabilidad />,
  },
  {
    path: '/admin/pokemones',
    element: <PokemonDashboard />,
  },
  {
    path: '/admin/pokemones/create',
    element: <FormPokemon />,
  },
  {
    path: '/admin/pokemones/edit/:id',
    element: <FormPokemon />,
  },
  {
    path: '/admin/pokemones/:id/photo',
    element:<PhotoPokemon />,
  },
  {
    path: '/admin/pokemones/:id/detail',
    element: <DetailPokemonAdmin />,
  },
  {
    path: '/pokemones',
    element: <PokemonList />,
  },
  {
    path: '/pokemones/:id/detail',
    element: <DetailPokemon />,
  },
  {
    path: 'admin/pokemones/:id/evolucion',
    element: <FormEvolucion />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
