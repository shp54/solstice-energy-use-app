import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { makeTimeSeries } from './helpers'
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
    
  sortByDate(array){
    return array.sort((a, b) => {
        let result = 0,
            aDate = new Date(a.year, a.month),
            bDate = new Date(b.year, b.month)
        
        if(aDate > bDate){
          result = 1
        } else if(aDate < bDate){
          result = -1
        } else if(aDate === bDate){
          result = 0
        }
        
        return result
    })
  }

  componentWillMount(){
    fetch("/data")
      .then((rsp) => rsp.json())
      .then((data) => {
        this.setState({ data: this.sortByDate(data) })
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
