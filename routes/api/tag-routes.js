const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{model: Product }]
    })
    res.status(200).json(allTags)
  } catch (err){
    res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const findTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(findTag)
  } catch (err){
    res.status(200).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
  const newTag = await Tag.create({
    tag_name: req.body.category_name,
  })
} catch (err){
  res.status(400).json(err);
}
  // create a new tag
});

router.put('/:id', async(req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateTag[0]){
      res.status(404).json({message: 'No Tag with this id!'});
      return
    }
    res.status(200).json(updateTag);
  } catch(err){
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
