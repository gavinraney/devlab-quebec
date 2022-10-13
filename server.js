console.log('in server.js')

//require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const PORT = (process.env.PORT || 3000) 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


//const { MongoClient, ServerApiVersion } = require('mongodb');
//const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
MongoClient.connect('mongodb+srv://graney1:yesesd9@quebec.bzxlvoo.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true})
  .then(client => {
    console.log('connected db')
    const db = client.db('quebec')
    const quotesCollection = db.collection('hamsters')

   

// app.get('/', function (req, res) {
//         const collection = client.db("test").collection("devices");
//         console.log('connected!');
//         // perform actions on the collection object
       
//         client.close();
//         console.log('closed!');
// });


    app.get('/', (req,res)=>{
        db.collection('hamsters').find().toArray()
          .then(results => {
            res.render('index.ejs', { hamsters: results })
          })
          .catch(error => console.error(error))
    })
    
    app.post('/hamsters', (req,res) =>{
        quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error));
    })
    
    app.put('/hamsters', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { hamster: 'michael' },
      {
        $set: {
          hamster: req.body.hamster,
          attribute: req.body.attribute
        }
      },
      {
        upsert: true
      }
    )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })

  app.delete('/hamsters', (req, res) => {
    quotesCollection.deleteOne(
      { hamster: req.body.hamster }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('no hamster to delete')
        }
        res.json('deleted a hamster')
      })
      .catch(error => console.error(error))
  })
  
})
.catch(error => console.error(error))

app.listen(PORT, console.log(`server is running on port: ${PORT}` ));