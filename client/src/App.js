import React, { Component } from 'react';
import { TimeSeries } from "pondjs";
import TimeSeriesGraph from './TimeSeriesGraph'
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  
  makeTimeSeries(data, field, name){
    let series = {
      name: name,
      columns: ["time", "value"],
      points: data.map((data) => [new Date(data.year, data.month - 1, 30).getTime(), data[field]])
    }

    return new TimeSeries(series)
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
        let timedata = this.sortByDate(data)
        this.setState({ 
          data: timedata, 
          billSeries: this.makeTimeSeries(timedata, 'bill', "utilityBills"),
          savingsSeries: this.makeTimeSeries(timedata, 'savings', "solarSavings"),
          usageSeries: this.makeTimeSeries(timedata, 'kwh', "usage")
        })
      })
  }

  render() {   
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Energy Spending and Usage</h1>
        </header>
        <div className="App-intro">
        { this.state.billSeries ? ( <TimeSeriesGraph title='Bill' series={this.state.billSeries} width={800} label="USD" format="$,.2f" /> ) : null }
        { this.state.savingsSeries ? ( <TimeSeriesGraph title='Savings' series={this.state.savingsSeries} width={800} label="USD" format="$,.2f" /> ): null }
        { this.state.usageSeries ? ( <TimeSeriesGraph title='Usage' series={this.state.usageSeries} width={800} label="kWh" format=".2f" /> ): null }
        { this.state.savingsSeries && this.state.billSeries ? 
        ( <TimeSeriesGraph title='Bills and Savings' series={[this.state.billSeries, this.state.savingsSeries]} width={800} label="USD" format="$,.2f" /> )  : null}
        </div>
      </div>
    );
  }
}

export default App;
