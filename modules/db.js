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


function insertScore(data) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    var name = data.name;
    var score = data.score;
    // Insert a single document
    db.collection('prush').find({ name: name }).toArray(function (err, result) {
      if (result.length > 0)  // player present in db
      {
        if (result[0].score < data.score) {  //check if previous score is greater than current
          db.collection('prush').update({ name: name }, { $set: { score: score } }, function (res, result) {
            db.close();
          });
        }
      }
      else // first time playing
      {
        db.collection('prush').insert(data, function (err, r) {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
          db.close();
        });
      }
    });
  });
}


function getScore(func) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    db.collection('prush').find({}).sort({ score: -1 }).limit(5).toArray(function (err, score) {
      assert.equal(err, null);
      func(score);
      db.close();
    });
  });
}


module.exports.insertScore = insertScore;
module.exports.getScore = getScore;