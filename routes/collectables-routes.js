const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const Collectables = require('../db/collectables-models');
const { validateToken } = require('../utils/authentication');
const Users = require('../db/users-models');

router.get('/', validateToken,  async (req, res) => {
  try {
    let collectables = null
    if (!req.query.random) {
      collectables = await Collectables.findAll();

    }
    else {
      collectables = await Collectables.findAll({ order: Sequelize.literal('rand()'), limit: parseInt(req.query.random) })

    }
    res.send(collectables)
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.get('/:id', validateToken,  async (req, res) => {
  try {
    const findCollectables = await Collectables.findByPk(req.params.id)
    if (!findCollectables) {
      res.status(404).send('Collectable is not found.');
      return;
    }
    res.send(findCollectables);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.post('/', validateToken, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send('name must have a value.')
      return;
    }
    if (!req.body.description) {
      res.status(400).send('description must have a value.')
      return;
    }
    if (!req.body.age) {
      res.status(400).send('age must have a value.')
      return;
    }
    if (!req.body.condition) {
      res.status(400).send('condition must have a value.')
      return;
    }
    let newCollectable = await Collectables.create({
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      condition: req.body.condition

    });
    res.status(201).send(newCollectable);

  } catch (error) {
    if(error.name === "SequelizeDatabaseError" && error.original.sqlMessage.includes('condition')){
      res.status(400).send("Condition can only be Mint, Excellent, Very Good and Poor")
    }
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})
router.put('/:id', validateToken, async (req,res)=>{
  try {
    if (!req.body.name) {
      res.status(400).send("name must be a value")
      return;
    }
    if (!req.body.description) {
      res.status(400).send("description must be a value")
      return;
    }
    if (!req.body.age) {
      res.status(400).send('age must have a value.')
      return;
    }
    if (!req.body.condition) {
      res.status(400).send('condition must have a value.')
      return;
    }
    const toUpdateCollectable = await Collectables.findByPk(req.params.id)
    if (!toUpdateCollectable) {
      res.status(404).send("Collectable is not found")
      return;
    }
    toUpdateCollectable.name = req.body.name,
    toUpdateCollectable.description = req.body.description,
    toUpdateCollectable.age = req.body.age,
    toUpdateCollectable.condition = req.body.condition;
    
    await toUpdateCollectable.save();
    res.status(200).send();
  } catch (error) {
    if(error.name === "SequelizeDatabaseError" && error.original.sqlMessage.includes('condition')){
      res.status(400).send("Condition can only be Mint, Excellent, Very Good and Poor")
    }
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }

})
router.delete('/:id', async (req, res) => {
  try {
      const deleteCollectable = await Collectables.findByPk(req.params.id);
      await deleteCollectable.destroy();
      
      res.status(204).send();
  } catch (error) {
      console.log(error);
      res.status(500).send(`Internal Server Error ${error}`)
  }
})
router.get('/:userId/:id', async (req, res) => {
  try {
    const findUser = await Users.findByPk(req.params.userId, {
      include: [
        {
          model: Collectables
        }
      ]
    });
    res.send(findUser.collectables);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
});

module.exports = router;