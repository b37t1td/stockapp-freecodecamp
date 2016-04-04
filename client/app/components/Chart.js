import React, {Component} from 'react';
import ReactHighstock from 'react-highcharts/dist/ReactHighstock';

export default class Chart extends Component {
  render() {
    return (
      <div className="stocks-chart">
        <ReactHighstock config={this.props.stocks} />
      </div>
    )
  }
}
