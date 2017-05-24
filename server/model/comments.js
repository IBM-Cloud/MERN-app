//model/comments.js

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  author: String,
  text: String,
  twitter: String,
  imageURL: String 
});

module.exports = mongoose.model('Comment', CommentsSchema);