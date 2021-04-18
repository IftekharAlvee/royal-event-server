const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s69t4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const eventCollection = client.db("royalEvent").collection("royalServices");
  // perform actions on the collection object
  const reviewCollection = client.db("royalEvent").collection("royalReviews");
  const orderCollection = client.db("royalEvent").collection("royalOrders");
  const adminCollection = client.db("royalEvent").collection("royalAdmins");


  app.post('/addServices',(req,res) => {
    const newServices = req.body;
    console.log(newServices);
    eventCollection.insertOne(newServices)
    .then(result => {
      console.log("kam sarse: " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  });

  app.get('/services',(req,res) => {
    eventCollection.find()
    .toArray((err, items) => {
      res.send(items);
      // console.log(items);
    })
    
  });

  app.post('/addReview',(req,res) => {
    const newReview = req.body;
    console.log(newReview);
    reviewCollection.insertOne(newReview)
    .then(result => {
      console.log("kam sarse: " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  });

  app.get('/reviews',(req,res) => {
    reviewCollection.find()
    .toArray((err, items) => {
      res.send(items);
      // console.log(items);
    })
    
  });

  app.post('/addOrder',(req,res) => {
    const newOrder = req.body;
    console.log(newOrder);
    orderCollection.insertOne(newOrder)
    .then(result => {
      console.log("kam sarse: " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  });

  app.get('/userOrders',(req,res) => {
    orderCollection.find({email: req.query.email})
    .toArray((err, items) => {
      res.send(items);
      // console.log(items);
    })
    
  });

  app.get('/isAdmin',(req,res)=>{
    adminCollection.find({email: req.query.email})
    .toArray((err, admins) => {
      res.send(admins)
      console.log(admins);
    })
})

  app.get('/orders',(req,res) => {
    orderCollection.find()
    .toArray((err, items) => {
      res.send(items);
      // console.log(items);
    })
    
  });

  app.delete('/deleteService/:id',(req,res) => {
    const Id = ObjectID(req.params.id);
    // console.log("delete this",  Id);
    eventCollection.deleteOne({_id: Id})
    .then(documents => {
      console.log(documents.deletedCount);
      res.send(documents)
    })
  });

  app.post('/addAdmin',(req,res) => {
    const newAdmin = req.body;
    console.log(newAdmin);
    adminCollection.insertOne(newAdmin)
    .then(result => {
      console.log("kam sarse: " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  });

  



  app.get('/', (req, res) => {
    res.send('database connected')
  })

});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})