// init project
var express = require('express')
var morgan = require('morgan')
var json = require('body-parser').json
var app = express()

app.use(morgan('dev'))
app.get("/", (req, res) => {
  res.send('OK')
})

// Your service will get a post from Missions
app.post("/", json(), function (req, res) {
  // Assign the input from Missions to a variable
  var input = req.body.input[1].value
  console.log('Input received: ' + input)
  
  // Check if the verification token is valid
  var verify_token = req.get('x-verification');

  if (verify_token === process.env.VERIFY_TOKEN) {
    // Return something back to Missions as an output
    res.json({
      handled: true,
      output: {
        movie_string: input + ' is a great movie.'
      }
    }) 
  } else {
    // Return an error
    console.log('Verify token doesn\'t match.')
    res.status(500).send({
      error: 'Invalid token'
    })
  }
})

// Listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
