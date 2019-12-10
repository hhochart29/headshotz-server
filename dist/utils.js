"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAuth = void 0;

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.passport) return res.redirect(`${process.env.CLIENT_ADDRESS}/login`);
  return next();
};

exports.requireAuth = requireAuth;
//# sourceMappingURL=utils.js.map