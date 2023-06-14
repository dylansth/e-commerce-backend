const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product],
    })
    res.status(200).json(tags)
  }
  catch (err) { res.status(500).json(err) }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product]

    })
    res.status(200).json(tag)
  }
  catch (err) { res.status(500).json(err) }
});

// create a new tag
router.post('/', async ({ body }, res) => {
  try {
    const newTag = await Tag.create(body);
    res.status(200).json(newTag);
  }
  catch (err) { res.status(500).json(err); }
});


// update a tag's name by its `id` value
router.put('/:id', async ({ body, params: { id } }, res) => {
  try {
    const updatedTag = await Tag.update(body, {
      where: {
        id: id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) { res.status(500).json(err); console.log(err) }
});

// delete on tag by its `id` value
router.delete('/:id', async ({ params }, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: params.id,
      },
    });
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
