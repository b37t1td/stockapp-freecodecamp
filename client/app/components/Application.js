import React, {Component} from 'react';
import {connect} from 'react-redux';

import Chart from 'components/Chart';
import Stocks from 'components/Stocks';


class Application extends Component {
  render() {
    return (
      <div>
        <Chart stocks={this.props.stocks} />
        <Stocks io={this.props.io} stocks={this.props.stocks} />
      </div>
    )
  }
}

export default connect(state => ({stocks : state}))(Application);
