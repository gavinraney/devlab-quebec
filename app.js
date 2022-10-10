console.log('in app.js')

require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        console.log('connected!');
        // perform actions on the collection object
       
        console.log('closed!');

    
        const result = collection.find().toArray();
         console.log(result.title);
            
            res.send(result.title);
            // client.close();
        
    });
});


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
    

app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));

  app.put('/hamsters', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { hamster: 'Hank' },
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

.catch(error => console.error(error))