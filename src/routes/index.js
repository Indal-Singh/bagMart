const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const verifyUserLoggedIn = require('../utils/verifyUserLoggedIn');

router.get('/',async (req,res)=>{
    const error = req.flash('error'); // Define or fetch your error messages here
    const isLoggedIn = await verifyUserLoggedIn(req); // Await the verification

    if (isLoggedIn) {
        return res.redirect('/shop');
    } else {
        return res.render("index", { error });
    }
});

router.get('/shop',isLoggedIn,(req,res)=>{
    let products = [];
    return res.render('shop',{products})
})

module.exports = router;