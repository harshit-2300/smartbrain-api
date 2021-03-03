const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors=require('cors');
const register = require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile'); 
const image=require('./controllers/image');

app.listen(process.env.PORT||3001, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})

const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
  });

  

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors());


app.get('/',(req,res)=>res.send("its working"));

app.post('/signin',signin.handleSignIn(db,bcrypt,bcrypt));

app.post('/register',(req,res)=>register.handleRegister(req,res,db,bcrypt,saltRounds))

app.get('/profile/:id',(req,res)=>profile.handleProfile(req,res,db));

app.put('/image',(req,res)=>image.handleImage(req,res,db));

app.post('/imageUrl',(req,res)=>image.handleImageUrl(req,res));

