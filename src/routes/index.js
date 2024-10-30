const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const verifyUserLoggedIn = require('../utils/verifyUserLoggedIn');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

router.get('/',async (req,res)=>{
    const error = req.flash('error'); // Define or fetch your error messages here
    const isLoggedIn = await verifyUserLoggedIn(req); // Await the verification

    if (isLoggedIn) {
        return res.redirect('/shop');
    } else {
        return res.render("index", { error });
    }
});

router.get('/shop',isLoggedIn, async (req,res)=>{
    let products = await productModel.find();
    return res.render('shop',{products})
})

router.get('/create-cart/:id',isLoggedIn, async (req,res)=>{
    const id = req.params.id;
    userId = req.user._id;
    let upd = await userModel.findByIdAndUpdate(userId,{
        $push:{cart:id}
    });
    if(upd)
    {
        res.send("added In cart");
        return res.redirect("/cart");
    }
    else
    {
        res.send("Faild To add in Cart.");
    }
})

router.get("/cart",isLoggedIn, async (req,res)=>{
    let usreID = req.user._id;
    let carts = await userModel.findById(usreID,'cart');
    let products = [];
    
    productPromises = carts.cart.map(async (pid)=>{
        return await productModel.findById(pid);
    })

    products = await Promise.all(productPromises);

    console.log(products);
    return res.render("cart",{products});
})

module.exports = router;