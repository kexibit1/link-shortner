const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  links: [{ type: mongoose.Types.ObjectId, ref: "Link" }],
});

module.exports = mongoose.model("User", schema);
