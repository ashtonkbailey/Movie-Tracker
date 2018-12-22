import { key } from './apiKey'

export const fetchMovies = async() => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
  const results = await fetch(url);
  const movieData = await results.json();
  return movieData.results
}

export const addNewUserFetch = async (user) => {
  const url = 'http://localhost:3000/api/users/new'
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!result.ok) {
    throw new Error('User already exists!')
  }
  const data = await result.json()
  return data.id
}

export const signInUser = async (user) => {
  const url = 'http://localhost:3000/api/users'
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!result.ok) {
    throw new Error('Email or password do not match!')
  }
  const returnedUsers = await result.json()
  return returnedUsers.data
}

