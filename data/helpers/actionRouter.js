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
router.post('/', async (req, res) => {
  // const actionId = req.param.id;
  const { project_id, description, notes } = req.body;
  const action = req.body;
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ message: 'Please provide a project id, description and notes.' });
  } else {
    try {
      const newAction = await Actions.insert(action);
      res.status(201).json(newAction);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong.' });
    }
  }
});

// update an action

// delete an action

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
