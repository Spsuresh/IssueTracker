const { ObjectId } = require('mongodb');
const mongoDB = require("../database/mongodb");

function filterBy(filter, projectDetails) {
  switch (filter) {
    case 'Project Title':
      projectDetails.sort((a, b) => a.projectName.localeCompare(b.projectName));
      break;
    case 'Project Description':
      projectDetails.sort((a, b) => a.description.localeCompare(b.description));
      break;
    case 'Project Author':
      projectDetails.sort((a, b) => a.authorName.localeCompare(b.authorName));
      break;
    default:
      break;
  }
  return projectDetails;
}

module.exports.issueTrackerPage = async (req, res) => {
  const collection = await mongoDB();
  const addedProject = await collection.find({ id: 'addedProject' }).toArray();
  return res.render('issueTracker', {
    title: "Issue Tracker",
    addedProject
  });
};

module.exports.createProject = (req, res) => {
  return res.render('createProject', {
    title: "Create Project"
  });
};

module.exports.addProjectToMongoDB = async (req, res) => {
  const formData = { ...req.body, id: "addedProject" };
  const collection = await mongoDB();
  collection.insertOne(formData, (err, data) => {
    if (err)
      throw err;
    else if (data)
      console.log('Data inserted');
  });
  res.redirect('/issueTracker');
};

module.exports.projectDetails = async (req, res) => {
  const collection = await mongoDB();
  const projectDetails = await collection.find({ id: 'addedProject' }).toArray();
  return res.render('projectDetails', {
    title: "Project Details",
    projectDetails
  });
};

module.exports.filterProjectDetails = async (req, res) => {
  const collection = await mongoDB();
  const projectDetails = await collection.find({ id: 'addedProject' }).toArray();
  const filterReq = req.body;

  if (filterReq.flexRadio) {
    const filteredProjectDetails = filterBy(filterReq.flexRadio, projectDetails);
    return res.render('projectDetails', {
      title: "Project Details",
      projectDetails: filteredProjectDetails
    });
  }

  res.redirect('/issueTracker/projectDetails');
};

module.exports.createAnIssue = async (req, res) => {
  const issueId = req.params;
  return res.render('createIssue', { title: "Create Issue", issueId });
}

module.exports.addAnIssue = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const issue = req.body;
  const bugId = req.params.id;
  const collection = await mongoDB();
  await collection.findOneAndUpdate(
    { _id: new ObjectId(bugId) },
    { $push: { bugs: issue } }
  );
  res.redirect('/issueTracker/projectDetails');
}
