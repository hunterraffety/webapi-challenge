const express = require('express');

const Actions = require('./actionModel');
const Projects = require('./projectModel');

const router = express.Router();

router.use(express.json());

// actions: project_id === id, description, notes

// get actions
router.get('/', (req, res) => {
  try {
    res.status(200).send(`<h2>Please provide a project ID</h2>`);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong.' });
  }
});

// get action by id (useless? for now maybe. think.)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const actions = await Actions.get(id);
    res.status(200).send(actions);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong.' });
  }
});

// create an action for a project
router.post;
// update an action

// delete an action

// middleware to tie project_id to parameter id?

module.exports = router;
