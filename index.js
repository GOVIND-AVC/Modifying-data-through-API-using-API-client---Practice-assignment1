const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose')

const user =require('./schema');
const { json } = require('stream/consumers');

const app = express();
const port = 3010;

const connectDb=mongoose.connect('mongodb://localhost:27017/RESTAURANTMENU')
.then(()=>{
  console.log('connected to database')
  })
.catch((err)=>{
  console.log(err)
  })

app.use(express.json())


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/menu',async(req,res)=>{
  try{
  const{name,description,price}=req.body;
  const newMenu = new user({name,description,price})
  await newMenu.save()
  res.status(201).send("created menu")
  }
  catch(err){
    res.status(500).json({message:err})
  }

})


app.get('/menu',async(req,res)=>{
  const menu=await user.find()
  if(!menu){
    res.status(404).json("menu not found")
  }
  else{
    res.status(200).json(menu)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
