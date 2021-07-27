const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: {model: Product, through: ProductTag, as: 'tag_product' } });
    res.status(200).json(tags);
  } catch (err) {
    // be sure to include its associated Products
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: {model: Product, through: ProductTag, as: 'tag_product'}
    });
    if (!tagById) {
      res.status(404).json({ message: "No tag found with this id." });
    }
    res.status(200).json(tagById);
  } catch {
    // be sure to include its associated Products
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log(req.body)
  try {
    const newTag = await Tag.create({
      tag_name: req.body[0].tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagById = await Tag.findByPk(req.params.id)
    console.log(tagById)
 const upTag = await Tag.update({ tag_name: req.body[0].tag_name }, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(upCat)
}catch (err){
  res.status(400).json(err)
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTag) {
      res.status(404).json({ message: "No tag found with that id" });
    }
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
