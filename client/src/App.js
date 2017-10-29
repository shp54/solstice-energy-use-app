import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import BillPage from './BillPage'
import SavingsPage from './SavingsPage'
import './App.css';

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
        let timedata = this.sortByDate(data)
        this.setState({ 
          data: timedata, 
          /*billSeries: this.makeTimeSeries(timedata, 'bill', "utilityBills"),
          savingsSeries: this.makeTimeSeries(timedata, 'savings', "solarSavings"),
          usageSeries: this.makeTimeSeries(timedata, 'kwh', "usage")*/
        })
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
          <Route exact path="/" component={() => <BillPage title='Bill' data={this.state.data} />} />
          <Route exact path="/savings" component={() => <SavingsPage title='Savings' data={this.state.data} />} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
