const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
    include: [Product],
  })
  res.status(200).json(categories)
}
  catch(err) {res.status(500).json(err)}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
   try {const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      Product
    ]

  })
  res.status(200).json(category)
}
catch(err) {res.status(500).json(err)}
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async ({body}, res) => {
try {
  
  const category = await Category.create(body)

  res.status(200).json(category)

} catch(err) {res.status(500).json(err)}
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
