// init project
var express = require('express')
var json = require('body-parser').json
var app = express()

app.get("/", (req, res) => {
  res.send('OK')
})

// Your service will get a post from Missions
app.post("/", json(), function (req, res) {
  // Assign the input from Missions to a variable
  let input = req.body.input && req.body.input.find(i => i.name === 'movie')
  if (!input) return res.status(412).send('movie input not found')  
  console.log('Input received: ' + input.value)
  
  // Check if the verification token is valid
  var verify_token = req.get('x-verification');
  if (verify_token !== process.env.VERIFY_TOKEN) {
    console.log('Verify token doesn\'t match.')
    return res.status(403).send('Verification token does not match 🙅')
  }

  // Return something back to Missions as an output
  res.json({
    handled: true,
    output: {
      movie_string: `${input.value} is a great movie.`
    }
  }) 
})

// Listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is 🎧 on port ' + listener.address().port)
})
