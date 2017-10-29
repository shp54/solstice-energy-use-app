import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";

const TimeSeriesGraph = ({ title, series, width, label, format }) => {
    if(!Array.isArray(series)){
      series = [series]
    }
      
    return (
      <div>
        <h1>{title}</h1>
        <ChartContainer timeRange={series ? series[0].timerange() : null} width={width}>
          <ChartRow height="200">
              <YAxis id="axis1" label={label} min={0} max={series[0].max()} width="60" type="linear" format={format} />
              <Charts>
                {series.map((series, index) => (<LineChart axis="axis1" series={series} key={index} />))}     
              </Charts>
          </ChartRow>
      </ChartContainer>
    </div>
  )
}

export default TimeSeriesGraph;