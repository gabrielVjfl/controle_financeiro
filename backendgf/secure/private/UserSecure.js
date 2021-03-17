const expresss = require("express");

const jwt = require("jsonwebtoken");

const authSecret = require("../auth.json");

module.exports = function UserSecure(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ errBackend: "Não Autorizado!" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, authSecret.secret);

    const { _id } = data;

    req.userId = _id;

   next();

  } catch (err) {
    res.status(400).json({ errBackend: "Não Autorizado!" });
  }
};
