const express = require('express');

const Actions = require('./actionModel');

const router = express.Router();

router.use(express.json());

// get actions
router.get('/', (req, res) => {
  try {
    res.status(200).send(`<h2>Please provide a project ID</h2>`);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong.' });
  }
});

// get action per project id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const actions = await Actions.get(id);
    res.status(200).send(actions);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
