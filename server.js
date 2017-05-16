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

const port = process.env.API_PORT || process.env.PORT || 3001;
const mongoURL = process.env.MONGO_URL || 'localhost/comments';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';

console.log(`mongoURL is ${mongoURL}`);

let mongoConnect = 'mongodb://localhost:27017'
if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
  mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}`;
} else if (mongoURL !== '') {
  mongoConnect = `mongodb://${mongoURL}`;
}

mongoose.Promise = global.Promise;
mongoose.connect(mongoConnect);

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
  
    const text = req.body.text;
    const author = req.session.author;
    const twitter = req.session.twitter;
    const imageURL = req.session.imageURL;

    if (!text || !author || !twitter || !imageURL ) {
      res.json({ message: 'Not signed in'});
      return
    }

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

  req.session.destroy();
  console.log('Logged out');
 
  res.json({message: 'Successfully logged out'});
});

router.post('/comments/login', (req, res) => {
  const author = req.body.author;
  const twitter = req.body.twitter;
  const imageURL = req.body.imageURL;

  console.log(`Received sign in request from ${author}, ${twitter}, ${imageURL}`);

  req.session.author = author;
  req.session.twitter = twitter;
  req.session.imageURL = imageURL;

  res.json({message: 'Successfully logged in'});

});

router.get('/comments/session', (req, res) => {
  res.json({
    author: req.session.author,
    twitter: req.session.twitter,
    imageURL: req.session.imageURL
  });
});

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});


