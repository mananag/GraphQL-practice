const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const MongoClient = require('mongodb').MongoClient;


const app = express();

// Replace with your mongoLab URI
const uri = "mongodb+srv://mananAgrawal:xBAArfHoLyMUdgW1@lyricaldb.w8zng.mongodb.net/lyricaldb?retryWrites=true&w=majority";
if (!uri) {
  throw new Error('You must provide a MongoLab URI');
}

// const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true  });
//
// client.connect()

mongoose.Promise = global.Promise;
mongoose.connect(uri,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!');
});

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
