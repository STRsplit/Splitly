const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/splitlyDB');

const db = mongoose.connection;

db.on('error', function() {
  console.log('error connecting to database');
});

db.once('open', function(){
  console.log('database is connected');
});

module.exports = db;
