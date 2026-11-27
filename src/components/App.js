import React, { useReducer, useEffect } from 'react'

import '../App.css'
import key from '../api/key'
import Header from './Header'
import Movie from './Movie'
import Search from './Search'

const DEFAULT_SEARCH = 'man'
const NETWORK_ERROR = 'Could not reach OMDB. Check your connection and try again.'

const searchUrl = searchValue => {
  const term = encodeURIComponent(searchValue)

  return `https://www.omdbapi.com/?s=${term}&apikey=${key.secret}`
}

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }

    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      }

    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      }

    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchMovies = searchValue => {
    fetch(searchUrl(searchValue))
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: 'SEARCH_MOVIES_FAILURE',
          error: NETWORK_ERROR,
        })
      })
  }

  useEffect(() => {
    fetchMovies(DEFAULT_SEARCH)
  }, [])

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    })

    fetchMovies(searchValue)
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className='App'>
      <Header text='OMDB' />
      <Search search={search} />

      <p className='App-intro'>Sharing a few of our favourite movies</p>

      <div className='movies'>
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
