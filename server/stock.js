var request = require('request');

module.exports = function(app) {
  var self = this;

  function pad(i) {
    return i < 10 ? '0' + i : i;
  }

  function composeURI(stock) {
    var date = new Date();
    var year = date.getFullYear();
    var month = pad(date.getMonth() + 1);
    var day = pad(date.getDate());

    var URI = 'https://www.quandl.com/api/v3/datasets/WIKI/';
    URI += stock + '.json';
    URI += '?api_key=' + process.env.QUANDL_KEY;
    URI += '&start_date=' + (year - 1) + '-' + month + '-' + day;
    URI += '&end_date=' + year + '-' + month + '-' + day;
    URI += '&exclude_column_names=true&column_index=1&order=asc';

    return URI;
  }

  function composeDataCol(col) {
    return [
        new Date(col[0]).getTime(),
        col[1]
    ];
  }

  function composeData(data) {
    return {
      name : data.dataset.dataset_code,
      description : data.dataset.name,
      data : data.dataset.data.map(composeDataCol)
    };
  }

  this.fetchStock = function(name, cb) {
    new request(composeURI(name), function(err, resp, body) {
        if (!err && resp.statusCode === 200) {
          cb(composeData(JSON.parse(body)));
        } else {
          cb({});
        }
    });
  }

  app.get('/api/stock/:name', function(req, res) {
    self.fetchStock(req.params.name, function(data) {
      res.send(JSON.stringify(data));
    });
  });

  return this;
}
