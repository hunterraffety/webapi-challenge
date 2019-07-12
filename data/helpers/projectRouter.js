// dependencies
const express = require('express');
const Projects = require('./projectModel');

// express
const router = express.Router();

router.use(express.json());

// Project: name, description, completed

// get projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: 'Cannot retrieve projects.' });
  }
});
// add a project

// delete a project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const remove = await Projects.remove(id);
    if (remove > 0) {
      res.status(200).json({ message: 'Project deleted.' });
    } else {
      res.status(404).json({ error: 'A project with that ID was not found.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error deleting that project.' });
  }
});

// update a project

module.exports = router;
