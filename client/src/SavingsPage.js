import React from 'react'
import { makeTimeSeries } from './helpers'
import TimeSeriesGraph from './TimeSeriesGraph'

const SavingsPage = ({title, data}) => {
  if(data.length > 0){
    let series = makeTimeSeries(data, 'savings', "solarSavings")
    return ( <TimeSeriesGraph title={title} series={series} width={800} label="USD" format="$,.2f" /> )
  } else {
    return null
  }
}

export default SavingsPage