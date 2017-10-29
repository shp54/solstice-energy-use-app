let express = require('express'),
    utilData = require('./utilData.json')

let port = 3001

//Start app

let app = express()

app.get('/data', (req, res) => {
  res.send(utilData)
})

let server = app.listen(port, () => {
   console.log("Now listening on port", port)
})