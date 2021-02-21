import { FormState } from '@app/pages/Home/components'

export enum FormContent {
  CREATE = 'create',
  EDIT = 'edit'
}

export const GENRES = [
  'action',
  'adventure',
  'comedy',
  'crime',
  'disaster',
  'documentary',
  'drama',
  'fantasy',
  'history',
  'horror',
  'mystery',
  'psychological',
  'romance',
  'satire',
  'thriller',
  'war',
  'western'
]

export const INITIAL_STATE: FormState = {
  genre: [],
  overview: '',
  movieId: '00001',
  releaseDate: '',
  title: '',
  url: ''
}

export enum FormTestIds {
  CLOSE_ICON = 'form-close-icon'
}
