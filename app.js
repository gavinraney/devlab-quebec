console.log('in app.js')

require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express()
let posts = ''; 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        console.log('connected!');
        // perform actions on the collection object
       
        client.close();
        console.log('closed!');
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
    
const PORT = process.env.PORT || 3000

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

//////////////////////////////////////////////////////////////////////
async function main(){
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      databasesList = await client.db().admin().listDatabases();

      console.log("Databases:");
      databasesList.databases.forEach(db => console.log(` - ${db.name}`));

      posts = await client.db("myFirstDatabase").collection("posts").findOne();

      console.log(posts); 
      
      return posts; 
      // return posts.findOne();


  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

// main().catch(console.error);


app.get('/', async function (req, res) {
  // res.sendFile(path.join(__dirname, "index.html" )); 
  // res.send('Hello ' + userName + ' from Node/Express/Heroku');

  const result = await main().catch(console.error);

  console.log("results: ", result.title); 

 res.send(`results:  ${ result.title }`); 
// res.send("farts"); 
  });
//////////////////////////////////////////////////////////////////////



app.listen(PORT, console.log(`server is running on port: ${PORT}` ));