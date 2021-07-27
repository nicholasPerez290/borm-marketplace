const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
 
  try {
    const categories = await Category.findAll({ include: Product });
    res.status(200).json(categories);
  } catch (err) {
    
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!categoryById) {
      res.status(404).json({ message: "No Category found with this id." });
    }
    res.status(200).json(categoryById);
  } catch {
    
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  
  try {
    const newCat = await Category.create({
      category_name: req.body[0].category_name
    });
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async(req, res) => {
 
  try {
    const categoryById = await Category.findByPk(req.params.id)
    console.log(categoryById)
 const upCat = await Category.update({ category_name: req.body[0].category_name }, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(upCat)
}catch (err){
  res.status(400).json(err)
}
});

router.delete("/:id", async (req, res) => {
  
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCat) {
      res.status(404).json({ message: "No catagory found with that id" });
    }
    res.status(200).json(delCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
