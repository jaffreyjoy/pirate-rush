var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/game';


// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongo server");
  db.close();
});

function insertScore(score) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    // Insert a single document
    db.collection('score').insert(score, function (err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);

      db.close();
    });
  });
}


function getScore(func) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    db.collection('score').find({}).sort({ score: -1 }).limit(5).toArray(function (err, score) {
      assert.equal(err, null);
      func(score);
      db.close();
    });
  });
}


module.exports.insertScore = insertScore;
module.exports.getScore = getScore;