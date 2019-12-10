if (process.env.NODE_ENV !== 'production') require('dotenv').config()

import { Router } from 'express'
import SteamStrategy from 'passport-steam'
import passport from 'passport'
import { saveUser } from '../firebase'

const SteamRouter = Router()

passport.serializeUser((user, done) => done(null, user._json))
passport.deserializeUser((obj, done) => done(null, obj))

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.SERVER_ADDRESS}/auth/steam/return`,
      realm: `${process.env.SERVER_ADDRESS}/`,
      apiKey: process.env.STEAM_API_KEY
    },
    (_identifier, profile, done) => {
      return done(null, profile)
    }
  )
)

SteamRouter.use(passport.initialize())
SteamRouter.use(passport.session())

SteamRouter.get(
  '/login',
  passport.authenticate('steam', { failureRedirect: '/' })
)

SteamRouter.get(
  '/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (_req, res) => res.redirect(process.env.CLIENT_ADDRESS)
)

SteamRouter.get('/session', async (req, res) => {
  if (!req.session || !req.session.passport)
    return res.send({ error: 'No active session' })

  await saveUser(req.session.passport)
  return res.send({ session: req.session.passport })
})

SteamRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_ADDRESS)
})

export default SteamRouter
