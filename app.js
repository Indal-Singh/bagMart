const express = require("express");
const app = express();
const cookiesParser = require('cookie-parser');
const path = require('path');

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookiesParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.send("Hellow Indal");
})

app.listen(PORT,()=>{
console.log(`server is Running On Part `,PORT);
})