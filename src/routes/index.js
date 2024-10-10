const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    const error = []; // Define or fetch your error messages here
    res.render("index",{error});
});

module.exports = router;