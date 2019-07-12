// dependencies
const express = require('express');
const Projects = require('./projectModel');
const cors = require('cors');
// express
const router = express.Router();

router.use(cors());
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

// get project actions
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await Projects.get(id);
  if (!project) {
    res
      .status(404)
      .json({ message: 'There is no action associated with that project' });
  } else {
    try {
      const project = await Projects.getProjectActions(id);
      res.status(200).json(project);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Cannot retrieve that project's actions." });
    }
  }
});

// add a project
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const validatedProject = { name, description };
  console.log(validatedProject);
  if (!name || !description) {
    res
      .status(400)
      .json({ message: 'Please make sure there is a name and a description.' });
  } else {
    try {
      const newProject = await Projects.insert(validatedProject);
      if (newProject) {
        res.status(201).json(validatedProject);
      } else {
        res.status(400).json({ message: 'Something went wrong.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'There was an error.' });
    }
  }
});

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
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  if (!name || !description) {
    res
      .status(400)
      .json({ message: 'Please make sure there is a name and a description.' });
  } else {
    try {
      const project = await Projects.update(id, req.body);
      if (project) {
        res.status(200).json({ message: 'Successful update.' });
      } else {
        res.status(404).json({ error: 'That project could not be found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating that project.' });
    }
  }
});

module.exports = router;
