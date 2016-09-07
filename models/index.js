var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recaptcha-express");

module.exports.Switt = require("./switt.js");
