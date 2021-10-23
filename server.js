const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.ejs')
  })

  app.get('/api',(req,res) => {
    if (req.query.word) {
      let string = req.query.word
      console.log("got this word from the browser",string)
      let reverseStr = string.split('').filter(el => el !== ' ').reverse().join('')
      let newStr = string.split('').filter(el => el !== ' ').join('')
      let palindrome = reverseStr === newStr
     
      const objToJson = {
        palindrome: palindrome
      }
      res.send(objToJson);
    } else {
        const objToJson = {
        error: "Word Required"
      }
      res.send(objToJson);
    }
  
  })
  app.listen(8000, console.log('running'));