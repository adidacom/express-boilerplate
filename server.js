const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const api = require('./routes');
const config = require('./config/keys');

const app = express();

// set cors origin
app.use(
  cors({
    origin: '*',
  }),
);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);

// DB Config
const mongoURI = config.mongoURI;
// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder for client
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(express.static(path.join(__dirname, 'public')));

// set port
const port = config.port;
app.listen(port, () => console.log(`Server running on port ${port}`));
