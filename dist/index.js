'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportSteam = require('passport-steam');

var _passportSteam2 = _interopRequireDefault(_passportSteam);

var _firebase = require('./firebase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = (0, _express2.default)();
app.use((0, _cors2.default)({ origin: process.env.CLIENT_ADDRESS, credentials: true }));

_passport2.default.serializeUser((user, done) => done(null, user._json));
_passport2.default.deserializeUser((obj, done) => done(null, obj));
_passport2.default.use(new _passportSteam2.default({
  returnURL: `${process.env.SERVER_ADDRESS}/steam/auth/return`,
  realm: `${process.env.SERVER_ADDRESS}/`,
  apiKey: process.env.STEAM_API_KEY
}, (_identifier, profile, done) => {
  return done(null, profile);
}));

app.use((0, _expressSession2.default)({
  secret: process.env.STEAM_API_KEY,
  name: 'HZ_SESSION',
  resave: true,
  saveUninitialized: true
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.get('/steam/auth', _passport2.default.authenticate('steam', { failureRedirect: '/' }));

app.get('/steam/auth/return', _passport2.default.authenticate('steam', { failureRedirect: '/' }), (_req, res) => res.redirect(process.env.CLIENT_ADDRESS));

app.get('/steam/session', async (req, res) => {
  if (!req.session || !req.session.passport) return res.send({ error: 'No active session' });

  await (0, _firebase.saveUser)(req.session.passport);
  return res.send({ req: req.session && req.session.passport });
});

app.get('/steam/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_ADDRESS);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port : ', process.env.PORT || 5000);
});
//# sourceMappingURL=index.js.map