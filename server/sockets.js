var async = require('async');

module.exports = function(io ,db, stock) {
  var stocks = io.of('/api/io');


  function getStocks(cb) {
    db.findStocks(function(err,data) {
      var tasks = [];

      data.map(function(d) {
          tasks.push(function(callback) {
            stock.fetchStock(d.name, function(stock) {
              callback(null, stock);
            });
          });
      });

      async.parallel(tasks, function(err, data) {
        if (err) return cb(err);
        cb(null, data);
      });
    });
  }

  function addStock(name, cb) {
    stock.fetchStock(name, function(data) {
      if (data.name === name) {
        db.addStock(name, function(err,d) {
          if (err) return cb(err);
          cb(null, d);
        });
      } else {
        cb('not found');
      }
    });
  }

  stocks.on('connection', function(client) {

    client.on('rm', function(name) {
      db.removeStock(name, function(err) {
        if (!err) {
          getStocks(function(err, data) {
            if (err) return;
            stocks.emit('stocks', data);
          });
        }
      });
    });

    client.on('add', function(name) {
      addStock(name, function(err) {
        if (!err) {
          getStocks(function(err, data) {
            if (err) return;
            stocks.emit('stocks', data);
          });
        }
      })
    });

    getStocks(function(err, data) {
      if (err) return;
      client.emit('stocks', data);
    });
  });



};
