if (process.env.NODE_ENV !== 'production') require('dotenv').config()

import express from 'express'
import cors from 'cors'
import { requireAuth } from './utils'
import CSGORouter from './csgo'
import AuthRouter from './auth'
import session from 'express-session'

const app = express()
app.use(cors({ origin: process.env.CLIENT_ADDRESS, credentials: true }))

app.use(
  session({
    secret: 'HeadshotzSecret',
    name: 'HZ_SESSION',
    resave: true,
    saveUninitialized: true
  })
)

app.use('/csgo', requireAuth, CSGORouter)
app.use('/auth', AuthRouter)

app.get('/test', (req, res) => {
  res.send({ t: req.session })
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port : ', process.env.PORT || 5000)
})
