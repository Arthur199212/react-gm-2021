import { rest } from 'msw'
import { API_URL } from '@app/config'
import { MOCK_MOVIE, MOCK_MOVIES } from './mock-data'

export const handlers = [
  rest.delete(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.get(`${API_URL}/movies`, (req, res, ctx) => {
    return res(ctx.json({ data: MOCK_MOVIES, limit: 8, offset: 0, totalAmount: 8 }))
  }),

  rest.get(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
    return res(ctx.json(MOCK_MOVIE))
  }),

  rest.post(`${API_URL}/movies`, (req, res, ctx) => {
    return res(ctx.json(MOCK_MOVIE))
  }),

  rest.put(`${API_URL}/movies`, (req, res, ctx) => {
    return res(ctx.json(MOCK_MOVIE))
  })
]
