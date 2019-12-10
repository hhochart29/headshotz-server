"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _utils = require("./utils");

var _csgo = _interopRequireDefault(require("./csgo"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: process.env.CLIENT_ADDRESS,
  credentials: true
}));
app.use('/csgo', _csgo.default);
app.use('/auth', _auth.default);
app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port : ', process.env.PORT || 5000);
});
//# sourceMappingURL=index.js.map