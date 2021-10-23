const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Mcontreras11:dTxbnYBe2XZjRcGJ@cluster0.2exur.mongodb.net/cluster0?retryWrites=true&w=majority";

const dbName = "demo";

app.listen(3000, () => {
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
			if(error) {
					throw error;
			}
			db = client.db(dbName);
			console.log("Connected to `" + dbName + "`!");
	});
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
db.collection('messages').find().toArray((err, result) => {
	if (err) return console.log(err)
	res.render('index.ejs', {messages: result})
})
})

app.post('/messages', (req, res) => {
db.collection('messages').save({name: req.body.name,count:1}, (err, result) => {
	if (err) return console.log(err)
	console.log('saved to database')
	res.redirect('/')
})
})

app.get('/search', (req, res) => {
  console.log(req.query.search)
  db.collection('messages').find({"name": {$regex : req.query.search,$options:'i'}}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})


app.put('/messages', (req, res) => {
db.collection('messages')
.findOneAndUpdate({name: req.body.name}, {
	$inc: {
		count:1
	}
}, {
	sort: {_id: 1},
	upsert: true
}, (err, result) => {
	if (err) return res.send(err)
	res.send(result)
})
})


app.delete('/messages', (req, res) => {
db.collection('messages').findOneAndDelete({name: req.body.name}, (err, result) => {
	if (err) return res.send(500, err)
	res.send('Message deleted!')
})
})
