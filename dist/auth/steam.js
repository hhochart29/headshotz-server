"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressSession = _interopRequireDefault(require("express-session"));

var _passportSteam = _interopRequireDefault(require("passport-steam"));

var _passport = _interopRequireDefault(require("passport"));

var _firebase = require("../firebase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SteamRouter = (0, _express.Router)();

_passport.default.serializeUser((user, done) => done(null, user._json));

_passport.default.deserializeUser((obj, done) => done(null, obj));

_passport.default.use(new _passportSteam.default({
  returnURL: `${process.env.SERVER_ADDRESS}/auth/steam/return`,
  realm: `${process.env.SERVER_ADDRESS}/`,
  apiKey: process.env.STEAM_API_KEY
}, (_identifier, profile, done) => {
  return done(null, profile);
}));

const a = process.env.STEAM_API_KEY;
SteamRouter.use((0, _expressSession.default)({
  secret: 'HeadshotzSecret',
  name: 'HZ_SESSION',
  resave: true,
  saveUninitialized: true
}));
SteamRouter.use(_passport.default.initialize());
SteamRouter.use(_passport.default.session());
SteamRouter.get('/login', _passport.default.authenticate('steam', {
  failureRedirect: '/'
}));
SteamRouter.get('/return', _passport.default.authenticate('steam', {
  failureRedirect: '/'
}), (_req, res) => res.redirect(process.env.CLIENT_ADDRESS));
SteamRouter.get('/session', async (req, res) => {
  if (!req.session || !req.session.passport) return res.send({
    error: 'No active session'
  });
  await (0, _firebase.saveUser)(req.session.passport);
  return res.send({
    req: req.session && req.session.passport
  });
});
SteamRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_ADDRESS);
});
var _default = SteamRouter;
exports.default = _default;
//# sourceMappingURL=steam.js.map