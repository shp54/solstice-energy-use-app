import { TimeSeries } from "pondjs";

function makeTimeSeries(data, field, name){
  let series = {
    name: name,
    columns: ["time", "value"],
    points: data.map((data) => [new Date(data.year, data.month - 1, 30).getTime(), data[field]])
  }

  return new TimeSeries(series)
}

export { makeTimeSeries }