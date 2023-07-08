const { ObjectId } = require('mongodb');
const mongoDB = require("../database/mongodb");

async function filterBy(filter, projectDetails) {
  switch (filter) {
    case 'Title':
      projectDetails.sort((a, b) => a.projectName.localeCompare(b.projectName));
      break;
    case 'Description':
      projectDetails.sort((a, b) => a.description.localeCompare(b.description));
      break;
    case 'Author':
      projectDetails.sort((a, b) => a.authorName.localeCompare(b.authorName));
      break;
    default:
      break;
  }
  return projectDetails;
}

module.exports = {
  issueTrackerPage: async (req, res) => {
    try {
      const collection = await mongoDB();
      const addedProject = await collection.find({ id: 'addedProject' }).toArray();
      return res.render('issueTracker', {
        title: 'Issue Tracker',
        addedProject,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  },

  createProject: (req, res) => {
    return res.render('createProject', {
      title: 'Create Project',
    });
  },

  addProjectToMongoDB: async (req, res) => {
    try {
      let formData = req.body;
      formData = { ...formData, id: 'addedProject' };
      const collection = await mongoDB();
      await collection.insertOne(formData);
      console.log('Data inserted');
      return res.redirect('/issueTracker');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  },

  projectDetails: async (req, res) => {
    try {
      const collection = await mongoDB();
      const projectDetails = await collection.find({ id: 'addedProject' }).toArray();
      return res.render('projectDetails', {
        title: 'Project Details',
        projectDetails,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  },

  filterProjectDetails: async (req, res) => {
    try {
      const collection = await mongoDB();
      let projectDetails = await collection.find({ id: 'addedProject' }).toArray();
      const filterReq = req.body;

      if (filterReq.flexRadio === 'Project Title') {
        projectDetails = await filterBy('Title', projectDetails);
      } else if (filterReq.flexRadio === 'Project Description') {
        projectDetails = await filterBy('Description', projectDetails);
      } else if (filterReq.flexRadio === 'Project Author') {
        projectDetails = await filterBy('Author', projectDetails);
      }

      return res.render('projectDetails', {
        title: 'Project Details',
        projectDetails,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  },

  createAnIssue: async (req, res) => {
    const issueId = req.params;
    return res.render('createIssue', {
      title: 'Create Issue',
      issueId,
    });
  },

  addAnIssue: async (req, res) => {
    try {
      const issue = req.body;
      const bugId = req.params.id;
      const collection = await mongoDB();
      await collection.findOneAndUpdate(
        { _id: ObjectId(bugId) },
        { $push: { bugs: issue } }
      );
      return res.redirect('/issueTracker/projectDetails');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  },
};
