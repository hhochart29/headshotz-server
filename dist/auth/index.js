"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _steam = _interopRequireDefault(require("./steam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AuthRouter = (0, _express.Router)();
AuthRouter.use('/steam', _steam.default);
var _default = AuthRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map