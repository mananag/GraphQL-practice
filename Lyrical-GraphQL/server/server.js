const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const MongoClient = require('mongodb').MongoClient;
const path = require('path')


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

//
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../client/index.html'), function(err) {
//     if (err) {
//       res.status(500).send('err')
//     }
//   })
// })
module.exports = app;
