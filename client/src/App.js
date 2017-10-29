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
          <ul> 
            <li><Link to="/">All Graphs</Link></li>
            <li><Link to="/bill">Monthly Bill</Link></li>
            <li><Link to="/savings">Monthly Savings</Link></li>
            <li><Link to="/usage">Monthly Usage</Link></li>
          </ul>
        </header>
        <div className="App-intro">          
          <Route exact path="/bill" component={(props) => <GraphPage title='Bill' data={this.state.data} seriesName='utilityBills' seriesValue='bill' label="USD" format="$,.2f"  />} />
          <Route exact path="/savings" component={(props) => <GraphPage title='Savings' data={this.state.data} seriesName='solarSavings' seriesValue='savings' label="USD" format="$,.2f" />} />
          <Route exact path="/usage" component={(props) => <GraphPage title='Usage' data={this.state.data} seriesName='monthlyUsage' seriesValue='kwh' label="kWh" format=".2f" />} />
          <Route exact path="/" component={(props) => 
            <div>
              <GraphPage title='Bill' data={this.state.data} seriesName='utilityBills' seriesValue='bill' label="USD" format="$,.2f"  />
              <GraphPage title='Savings' data={this.state.data} seriesName='solarSavings' seriesValue='savings' label="USD" format="$,.2f" />
              <GraphPage title='Usage' data={this.state.data} seriesName='monthlyUsage' seriesValue='kwh' label="kWh" format=".2f" />
            </div>          
          } />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
