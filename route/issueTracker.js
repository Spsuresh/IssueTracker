const express = require('express');
const router = express.Router();
const {
  issueTrackerPage,
  createProject,
  addProjectToMongoDB,
  projectDetails,
  filterProjectDetails,
  createAnIssue,
  addAnIssue
} = require("../controller/issueControllers");

router.get('/', issueTrackerPage);
router.get('/createProject', createProject);
router.post('/addProject', addProjectToMongoDB);
router.get('/projectDetails', projectDetails);
router.post('/filterProjectDetails', filterProjectDetails);
router.get('/createAnIssue/:id', createAnIssue);
router.post('/createAnIssue/:id/addIssue', addAnIssue);

module.exports = router;
