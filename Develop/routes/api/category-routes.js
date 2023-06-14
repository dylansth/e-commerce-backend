const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories, including its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    })
    res.status(200).json(categories)
  }
  catch (err) { res.status(500).json(err) }
});

// find one category by its `id` value, including its associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product]

    })
    res.status(200).json(category)
  }
  catch (err) { res.status(500).json(err) }
});

// create a category
router.post('/', async ({ body }, res) => {
  try {
    const newCategory = await Category.create(body);
    res.status(200).json(newCategory);
  }
  catch (err) { res.status(500).json(err); }
});

// update a category by its `id` value
router.put('/:id', async ({ body, params: { id } }, res) => {
  try {
    const updatedCategory = await Category.update(body, {
      where: {
        id: id,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (err) { res.status(500).json(err); console.log(err) }
});

// delete a category by its `id` value
router.delete('/:id', async ({ params }, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: params.id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
