import React, {Component} from 'react';


export default class Stocks extends Component {

  onKey(e) {
    if (e.key === 'Enter') {
      this.onAdd();
    }
  }

  onAdd() {
    let el = document.getElementById('new-stock');
    let stock = el.value.toUpperCase().replace(/\s/gi, '');

    if (stock.length > 0) {
      this.props.io.emit('add', stock);
      el.value = '';
    }
  }

  onRemove(name) {
    this.props.io.emit('rm', name);
  }

  render() {
    let stocks = this.props.stocks.series.map((s,i) => {
        return (
          <div key={i} className="col-xs-4">
            <div className="stock">
              <h3>{s.name} <span onClick={this.onRemove.bind(this, s.name)}
              className="btn btn-default pull-right">&times;</span></h3>
              <p className="desc">{s.description}</p>
            </div>
          </div>
        )
      });

    return (
      <div className="stocks-container">
        <div className="form-group">
          <label>Add stock e.g (GOOG, FB, AAPL, CECO ...)</label>
          <div className="input-group">
            <input id="new-stock" className="form-control" onKeyDown={this.onKey.bind(this)} />
            <span className="btn input-group-addon"
            onClick={this.onAdd.bind(this)}>Add Stock</span>
          </div>
        </div>
        <div className="row stocks-list">
          {stocks}
        </div>
      </div>
    )
  }
}
