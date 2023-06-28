const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

const errorHandler = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

// The `/api/products` endpoint

// find all products, including its associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Tag]
    })
    res.status(200).json(products)
  }
  catch (err) { res.status(500).json(err) }
});

// find a single product by its `id` including its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [Category, Tag]
    })
    res.status(200).json(product)
  }
  catch (err) { res.status(500).json(err) }
});

// create new product
router.post('/', async ({ body }, res) => {
  try {
    const newProduct = await Product.create(body);
    res.status(200).json(newProduct);
  }
  catch (err) { res.status(500).json(err); }
});

/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4]
  }
*/

// update product by its 'id' value
router.put('/:id', async ({ body, params: { id } }, res) => {
  try {
    const updatedProduct = await Product.update(body, {
      where: {
        id: id,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (err) { res.status(500).json(err); console.log(err) }
});

// delete product by 'id' value
router.delete('/:id', async ({ params }, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: params.id,
      },
    });
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
