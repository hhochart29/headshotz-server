import { Router } from 'express'
import SteamRouter from './steam'

const AuthRouter = Router()

AuthRouter.use('/steam', SteamRouter)

export default AuthRouter
