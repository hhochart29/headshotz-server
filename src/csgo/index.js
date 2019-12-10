if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import { Router } from 'express'
import fetch from 'node-fetch'
const CSGORouter = Router()

const defaultHeaders = {
  'TRN-Api-Key': process.env.TRACKER_GG_API_KEY
}

CSGORouter.get('/stats/:steamid([0-9]+)', async (req, res) => {
  if (!req.params.steamid) return res.send({ error: 'No steam id found' })

  const stats = await fetch(
    `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${req.params.steamid}`,
    {
      method: 'GET',
      headers: {
        ...defaultHeaders
      }
    }
  )

  const results = await stats.json()

  return res.send({ results })
})

export default CSGORouter
