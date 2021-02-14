import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { APP_PORT } from './config'
import { notFound, serverError } from './middlewares'

const CLIENT_FOLDER_PATH = '../client'

const app = express()

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", 'image.tmdb.org']
      }
    }
  })
)

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
  })
)

app.use(cookieParser())

app.use(express.json())

app.use(express.static(path.join(__dirname, CLIENT_FOLDER_PATH)))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `${CLIENT_FOLDER_PATH}/index.html`))
})

app.use(notFound)

app.use(serverError)

app.listen(APP_PORT, () => console.log(`WebServer is running at http://localhost:${APP_PORT}/`))
