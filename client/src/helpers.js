import { TimeSeries } from "pondjs";

function makeTimeSeries(data, field, name){
  let series = {
    name: name,
    columns: ["time", "value"],
    points: data.map((data) => [new Date(data.year, data.month - 1, 30).getTime(), data[field]])
  }

  return new TimeSeries(series)
}

function sortByDate(array){
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

export { sortByDate, makeTimeSeries }