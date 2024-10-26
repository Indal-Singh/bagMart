const ownerModel = require("../models/owner.model");
const productModel = require("../models/product.model");
const ownerCreate = async (req, res) => {
  const { name, email, password } = req.body;
  let owners = await ownerModel.find();
  if (owners.length > 0)
    res.status(503).send("You Don`t Have Permisttion To create Owners.");

  let createdUser = await ownerModel.create({
    fullname: name,
    email,
    password,
  });

  res.status(201).json(createdUser);
};

const productCreate = async (req, res) => {
    const fileName = req.file?.filename; // Optional chaining to avoid errors if file is not uploaded
    const { name, price, discount } = req.body;
   
    try {
        let product = await productModel.create({
            image: fileName,
            name,
            price,
            discount,
        });

        if (product) {
            req.flash("success", "Product Added.");
        } else {
            req.flash("success", "Failed To Add Product");
        }

        return res.redirect('/owner/admin/product/create');
    } catch (err) {
        console.error(err); // Log the error for debugging
        req.flash("success", "Failed To Add Product");
        return res.redirect('/owner/admin/product/create');
    }
};

const productHome = async (req,res) =>{
    let products = await productModel.find();
    // console.log(products);
    return res.render('admin',{products});
}

module.exports = { ownerCreate, productCreate, productHome};
