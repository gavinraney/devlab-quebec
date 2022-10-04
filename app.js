console.log('in app.js')

const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


let userName = "Joelzzzzz"; 
let thatData = ""; 

app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, "index.html" )); 
    // res.send('Hello ' + userName + ' from Node/Express/Heroku');
    // res.send(`Hello ${userName} from Node/Express/Heroku with Backticks!`)

    //res.render('index', {userName: userName}      );
})

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));

//so much mongodb progress to catch up on
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://graney1:yesesd9@quebec.bzxlvoo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log('closed!');
});