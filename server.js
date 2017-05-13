//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var RedisStore = require('connect-redis')(session);

var Comment = require('./model/comments');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/comments');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options = {
  host: 'localhost',
  port: 6379
}

app.use(session({
  store: new RedisStore(options),
  name: 'mern example',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

if (process.env.NODE_ENV == 'production') {
  console.log('Using production mode');
  var compression = require('compression');
  app.use(compression());

  app.use(express.static('build'));
}

router.get('/', function (req, res) {
  res.json({ message: 'API initialized' })
})

router.route('/comments')
  .get(function (req, res) {
    Comment.find(function (err, comments) {
      if (err)
        res.send(err);
      res.json(comments);
    });
  })
  .post(function(req, res) {
    const author = req.body.author;
    const text = req.body.text;
    const twitter = req.body.twitter;
    const imageURL = req.body.imageURL;

    const comment = new Comment(
      {
        author: author, 
        text: text,
        twitter: twitter,
        imageURL: imageURL
      }
      );

    comment.save(function(err) {
      if (err) 
      res.send(err);
      res.json({ message: 'Comment successfully added!' })
    });
  });

router.route('/comments/:comment_id')
  .put(function(req, res) {

  })
  .delete(function(req, res) {
    Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
      if (err) 
        res.send(err);
      res.json( { message: 'Comment has been deleted' })
    });
  });

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});


