import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { makeTimeSeries, sortByDate } from './helpers'
import TimeSeriesGraph from './TimeSeriesGraph'
import './App.css';

const GraphPage = ({title, data, seriesName, seriesValue, label, format }) => {
  return (data.length > 0) ?  <TimeSeriesGraph title={title} series={makeTimeSeries(data, seriesValue, seriesName)} width={800} label={label} format={format} /> : null
}

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
   
  componentWillMount(){
    fetch("/data")
      .then((rsp) => rsp.json())
      .then((data) => {
        this.setState({ data: sortByDate(data) })
      })
  }

  render() {   
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Energy Spending and Usage</h1>
        </header>
        <div className="App-intro">          
          <Route exact path="/" component={() => <GraphPage title='Bill' data={this.state.data} seriesName='utilityBills' seriesValue='bill' label="USD" format="$,.2f"  />} />
          <Route exact path="/savings" component={() => <GraphPage title='Savings' data={this.state.data} seriesName='solarSavings' seriesValue='savings' label="USD" format="$,.2f" />} />
          <Route exact path="/usage" component={() => <GraphPage title='Usage' data={this.state.data} seriesName='monthlyUsage' seriesValue='kwh' label="kWh" format=".2f" />} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
