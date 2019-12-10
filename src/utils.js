if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.passport)
    return res.redirect(`${process.env.CLIENT_ADDRESS}/login`)

  return next()
}
