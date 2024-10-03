const express = require("express");
require('dotenv').config(); // Load environment variables
const app = express();
const cookiesParser = require('cookie-parser');
const path = require('path');
const connectToDatabase = require('./src/config/mongoose.connection');
const userRoutes = require('./src/routes/userRoutes');
const ownerRoutes = require('./src/routes/ownerRouters');
const productRoutes = require('./src/routes/productRoutes');

const PORT = process.env.PORT ?? 3000;
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookiesParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

// connecting database 
connectToDatabase();

// routers here
app.get("/",(req,res)=>{
    res.send("Hellow Indal");
})

app.use('/user',userRoutes);
app.use('/owner',ownerRoutes);
app.use('/product',productRoutes);

// starting server here
app.listen(PORT,()=>{
console.log(`server is Running On Part `,PORT);
})