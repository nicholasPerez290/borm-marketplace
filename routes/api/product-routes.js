const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


router.get('/', async (req, res) => {
  // find all products
  
  try {
    const product = await Product.findAll({
      
          include: [{model: Category},
          {model: Tag, through: ProductTag, as: 'prod_tag'},
        ],
      
    })
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  
  try {
    const productById = await Product.findByPk(req.params.id, {include: [
      {
      model: Category
    },{
      model: Tag, through: ProductTag, as: 'prod_tag'}]
    });
    if (!productById) {
      res.status(404).json({ message: "No product found with this id." });
    }
    res.status(200).json(productById);
  } catch (err) {
    // be sure to include its associated Products
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
 
 console.log(req.body)
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tag_id
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
    
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const delProd = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delProd) {
      res.status(404).json({ message: "No product found with that id" });
    }
    res.status(200).json(delProd);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
