"use strict";

const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  email: {
    type: String,
    trim: true,
    require: true
  },
  hashed_password: {
    type: String,
    require: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

// Virtual Fields
userSchema
  .virtual("password")
  .set(function(password) {
    //create temporary variable called _password
    this._password = password;

    //generate = timestamp
    this.salt = uuidv1();

    //encrypt the password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

//Methods
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);
