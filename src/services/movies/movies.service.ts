import { API_URL } from '@app/config'
import { MovieFormFields } from '@app/components/MovieForm/store'
import { LIMIT, SearchBy, MoviesSearchResponse, Movie } from './movies.constants'

class MoviesService {
  async addMovie(movie: MovieFormFields): Promise<Movie> {
    const movieToAll = { ...movie, runtime: Number(movie.runtime), id: undefined }
    const res = await fetch(`${API_URL}/movies`, {
      body: JSON.stringify(movieToAll),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    if (!this.isStatusSuccessful(res.status)) {
      throw new Error(`Could not add movie with title: ${movie.title}`)
    }
    return res.json()
  }

  async deleteMovie(movieId: string): Promise<void> {
    await fetch(`${API_URL}/movies/${encodeURIComponent(movieId)}`, {
      method: 'DELETE'
    })
    if (!this.isStatusSuccessful(res.status)) {
      throw new Error(`Could not delete movie with id: ${movieId}`)
    }
  }

  async editMovie(movie: MovieFormFields): Promise<Movie> {
    const movieToEdit = { ...movie, runtime: Number(movie.runtime) }
    const res = await fetch(`${API_URL}/movies`, {
      body: JSON.stringify(movieToEdit),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    if (!this.isStatusSuccessful(res.status)) {
      throw new Error(`Could not edit movie with id: ${movie.id}`)
    }
    return res.json()
  }

  async fetchMovie(movieId: string): Promise<Movie> {
    const res = await fetch(`${API_URL}/movies/${encodeURIComponent(movieId)}`)
    if (!this.isStatusSuccessful(res.status)) {
      throw new Error(`Could not fetch movie with id: ${movieId}`)
    }
    return res.json()
  }

  async fetchMovies(
    query: string,
    searchBy: SearchBy = SearchBy.TITLE
  ): Promise<MoviesSearchResponse> {
    const res = await fetch(
      `${API_URL}/movies?search=${encodeURIComponent(
        query.trim()
      )}&searchBy=${searchBy}&limit=${LIMIT}`
    )
    if (!this.isStatusSuccessful(res.status)) {
      throw new Error(`Could not fetch movies with by query: ${query}`)
    }
    return res.json()
  }

  private isStatusSuccessful(status: number): boolean {
    return /^20[014]$/.test(String(status))
  }
}

export const moviesService = new MoviesService()
