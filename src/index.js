import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import SteamStrategy from 'passport-steam'
import { saveUser } from './firebase'
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_ADDRESS, credentials: true }))

passport.serializeUser((user, done) => done(null, user._json))
passport.deserializeUser((obj, done) => done(null, obj))
passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.SERVER_ADDRESS}/steam/auth/return`,
      realm: `${process.env.SERVER_ADDRESS}/`,
      apiKey: process.env.STEAM_API_KEY
    },
    (_identifier, profile, done) => {
      return done(null, profile)
    }
  )
)

app.use(
  session({
    secret: process.env.STEAM_API_KEY,
    name: 'HZ_SESSION',
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/steam/auth', passport.authenticate('steam', { failureRedirect: '/' }))

app.get(
  '/steam/auth/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (_req, res) => res.redirect(process.env.CLIENT_ADDRESS)
)

app.get('/steam/session', async (req, res) => {
  if (!req.session || !req.session.passport)
    return res.send({ error: 'No active session' })

  await saveUser(req.session.passport)
  return res.send({ req: req.session && req.session.passport })
})

app.get('/steam/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_ADDRESS)
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port : ', process.env.PORT || 5000)
})
