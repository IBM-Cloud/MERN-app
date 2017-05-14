//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

var Comment = require('./model/comments');

var app = express();
var router = express.Router();

const port = process.env.API_PORT || 3001;
const mongoURL = process.env.MONGO_URL || 'localhost/comments';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongoURL}`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sess = {
  store: new MongoStore({mongooseConnection: mongoose.connection }),
  name: 'mern example',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
};

if (process.env.NODE_ENV == 'production') {
  console.log('Using production mode');
  var compression = require('compression');
  app.use(compression());

  app.use(express.static('build'));
  
  app.set('trust proxy', 1); // trust the first proxy
  sess.cookie.secure = true;
}

app.use(session(sess));

router.get('/', function (req, res) {
  res.json({ message: 'API initialized' })
})

router.route('/comments')
  .get(function (req, res) {

    // console.log(req.session);

    Comment.find(function (err, comments) {
      if (err)
        res.send(err);
      res.json(comments);
    });
  })
  .post(function(req, res) {
    // const author = req.body.author;
    const text = req.body.text;
    // const twitter = req.body.twitter;
    //const imageURL = req.body.imageURL;
    const author = req.session.author;
    const twitter = req.session.twitter;
    const imageURL = req.session.imageURL;

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

router.post('/comments/logout', (req, res) => {
  res.session.destroy();
})

router.post('/comments/login', (req, res) => {
  const author = req.body.author;
  const twitter = req.body.twitter;
  const imageURL = req.body.imageURL;

  console.log(`Received sign in request from ${author}, ${twitter}, ${imageURL}`);

  req.session.author = author;
  req.session.twitter = twitter;
  req.session.imageURL = imageURL;

  res.json({message: 'Successfully logged in'});

})


app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});


