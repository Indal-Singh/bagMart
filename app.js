const express = require("express");
require('dotenv').config(); // Load environment variables
const app = express();
const cookiesParser = require('cookie-parser');
const path = require('path');
const connectToDatabase = require('./src/config/mongoose.connection');
const indexRoutes = require('./src/routes/index');
const userRoutes = require('./src/routes/userRoutes');
const ownerRoutes = require('./src/routes/ownerRouters');
const productRoutes = require('./src/routes/productRoutes');
const session = require('express-session'); 
const flash = require('connect-flash');

app.use(session({
    secret:process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false
}));

const PORT = process.env.PORT ?? 3000;
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookiesParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'src/views'));

// connecting database 
connectToDatabase();

// routers here
app.use('/',indexRoutes);
app.use('/users',userRoutes);
app.use('/owner',ownerRoutes);
app.use('/product',productRoutes);

// starting server here
app.listen(PORT,()=>{
console.log(`server is Running On Part `,PORT);
})