const express = require("express");
const router = express.Router();
const { ownerCreate, productCreate, productHome } = require('../controllers/owner.controller');
const upload = require("../utils/multerUpload");

router.get("/", (req, res) => {
  res.send("Owner Route");
});

if (process.env.NODE_ENV == "development") {
  router.post("/create", ownerCreate);
}

router.get('/admin',productHome)

router.get('/admin/product/create',(req,res)=>{
  let success = req.flash("success");
  res.render('createproducts',{success});
})

router.post('/admin/product/create',upload.single('image'),productCreate);


module.exports = router;
