'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var pino = require('pino')();

var MongoStore = require('connect-mongo')(session);

var Comment = require('./model/comments');

var app = express();
var router = express.Router();

pino.debug('Starting the MERN example');

// user set variables
const port = process.env.API_PORT || process.env.PORT || 3001;
const mongoURL = process.env.MONGO_URL || 'localhost';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoDBName = process.env.MONGO_DB_NAME || 'comments';
const staticDir = process.env.STATIC_DIR || 'build';

// connect to the MongoDB
let mongoConnect = 'mongodb://localhost:27017'
if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
  mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}/${mongoDBName}`;
} else if (mongoURL !== '') {
  mongoConnect = `mongodb://${mongoURL}/${mongoDBName}`;
}

pino.info(`Connect to ${mongoConnect}`);

mongoose.Promise = global.Promise;
mongoose.connect(mongoConnect)
  .catch((err) => {
    if (err) pino.error(err);
  });

var db = mongoose.connection;
db.on('error', (error) => {
  pino.error(error);
});

// set up other middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sess = {
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  name: 'mern example',
  secret: 'keyboard cat',
  resave: false,
  saveUnitialized: true,
  cookie: {}
};

// production only middleware
if (process.env.NODE_ENV == 'production') {
  pino.info('Using production mode');
  var compression = require('compression');
  app.use(compression());

  app.use(express.static(staticDir));

  app.set('trust proxy', 1); // trust the first proxy
  // sess.cookie.secure = true;

  app.use(morgan('combined'));
}

app.use(session(sess));


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
  .post(function (req, res) {

    const text = req.body.text;
    const author = req.session.author;
    const twitter = req.session.twitter;
    const imageURL = req.session.imageURL;

    if (!text || !author || !twitter || !imageURL) {
      res.json({ message: 'Not signed in' });
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

    comment.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' })
    });
  });

router.route('/comments/:comment_id')
  .put(function (req, res) {

  })
  .delete(function (req, res) {
    Comment.remove({ _id: req.params.comment_id }, function (err, comment) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment has been deleted' })
    });
  });

router.post('/comments/logout', (req, res) => {

  req.session.destroy();
  pino.info('Logged out');

  res.json({ message: 'Successfully logged out' });
});

router.post('/comments/login', (req, res) => {
  const author = req.body.author;
  const twitter = req.body.twitter;
  const imageURL = req.body.imageURL;

  pino.info(`Received sign in request from ${author}, ${twitter}, ${imageURL}`);

  req.session.author = author;
  req.session.twitter = twitter;
  req.session.imageURL = imageURL;

  res.json({ message: 'Successfully logged in' });

});

router.get('/comments/session', (req, res) => {
  res.json({
    author: req.session.author,
    twitter: req.session.twitter,
    imageURL: req.session.imageURL
  });
});

app.use('/api', router);

app.get('/health', (req, res) => {
  res.json({
    state: "UP"
  })
});

app.listen(port, function () {
  pino.info(`api running on port ${port}`);
});


