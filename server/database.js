var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


module.exports = function Database(callback) {
  this.db = null;
  var self = this;

  mongo.connect(process.env.MONGO_URI, function(err, db) {
    if (err) return console.log(err);
    self.db = db;
    callback();
  });


  this.findStocks = function(cb) {
    var stock = db.collection('stock');

    stock.find({}).toArray(function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };

  this.removeStock = function(name , cb) {
    var stock = db.collection('stock');

    stock.remove({name : name}, function(err, data) {
      if (err) return cb(err);

      cb(null, data);
    });
  }

  this.addStock = function(name, cb) {
    var stock = db.collection('stock');

    this.findStocks(function(err, stocks) {
      if (err) return cb(err);

      if (stocks.map(function(s) { return s.name }).indexOf(name) !== -1) {
        return cb('Already exists');
      }

      stock.insert({name : name}, function(err, data) {
        if (err) return cb(err);
        cb(null , data);
      });

    });
  }



return this;
};
