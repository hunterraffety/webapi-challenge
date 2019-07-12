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

// get action by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const actions = await Actions.get(id);
    res.status(200).send(actions);
  } catch (error) {
    res.status(404).json({ message: 'No action with that ID.' });
  }
});

// create an action for a project
router.post('/', async (req, res) => {
  // const actionId = req.param.id;
  const { project_id, description, notes } = req.body;
  const action = req.body;
  const checkProjects = await Projects.get(project_id);

  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ message: 'Please provide a project id, description and notes.' });
  } else {
    if (!checkProjects) {
      res.status(404).json({ message: 'No project with that ID found.' });
    } else {
      try {
        const newAction = await Actions.insert(action);
        res.status(201).json(newAction);
      } catch (error) {
        res.status(400).json({ message: 'Something went wrong.' });
      }
    }
  }
});

// update an action
router.put('/:id', async (req, res) => {
  const { notes, description, completed } = req.body;
  const { id } = req.params;

  if (!notes || !description) {
    res.status(400).json({
      message: 'Please make sure there are notes and a description.'
    });
  } else {
    try {
      const changes = await Actions.update(id, req.body);
      if (changes) {
        res.status(200).json({ message: 'Successful update.' });
      } else {
        res.status(404).json({ error: 'That action could not be found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating that action.' });
    }
  }
});

// delete an action
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const remove = await Actions.remove(id);
    if (remove > 0) {
      res.status(200).json({ message: 'Action deleted.' });
    } else {
      res.status(404).json({ error: 'An action with that ID was not found.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error deleting that action.' });
  }
});

// middleware to tie project_id to parameter id? idk.
// function getProjectId(req, res, next) {
//   const { id } = req.params;
//   Projects.getProjectActions(id)
//     .then(project => {
//       if (!project) {
//         res.status(404).json({ message: 'Invalid project ID.' });
//       } else {
//         console.log(project);
//         projectId = project.project_id;
//         next();
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ message: 'Project could not be retrieved.' });
//     });
// }

module.exports = router;
