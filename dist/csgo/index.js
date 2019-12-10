"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CSGORouter = (0, _express.Router)();
const defaultHeaders = {
  'TRN-Api-Key': process.envTRACKER_GG_API_KEY
};
CSGORouter.get('/stats/:steamid([0-9]+)', async (req, res) => {
  if (!req.params.steamid) return res.send({
    error: 'No steam id found'
  });
  const stats = await (0, _nodeFetch.default)(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${req.params.steamid}`, {
    method: 'GET',
    headers: { ...defaultHeaders
    }
  });
  const results = await stats.json();
  return res.send({
    results
  });
});
var _default = CSGORouter;
exports.default = _default;
//# sourceMappingURL=index.js.map