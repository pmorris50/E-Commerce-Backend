const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //console.log('line 8 hit');
  try {
    const allCat = await Category.findAll({
      include: [
        { model: Product,
        attributes: ['product_name'] }]
    })
    console.log(allCat)
    res.status(200).json(allCat)
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const findCat = await Category.findByPk(req.params.id, {
      include: [
        { model: Product,
        attributes: ['product_name'] }]
    })
    res.status(200).json(findCat)
    return;
  } catch (err) {
    res.status(500).json(err)
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(
      req.body

    );
    res.status(200).json(newCat)
    return

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCat[0]) {
      console.log('Hit Create Category Route')
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json('Name Changed');
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!deleteCat) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(deleteCat)
  } catch (err) {
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
