const { ObjectId } = require("mongodb");
const mongoDB = require("../database/mongodb");

async function filterBy(filter, projectDetails) {
  switch (filter) {
    case "Title":
      projectDetails.sort((a, b) => a.projectName.localeCompare(b.projectName));
      break;
    case "Description":
      projectDetails.sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "Author":
      projectDetails.sort((a, b) => a.authorName.localeCompare(b.authorName));
      break;
    default:
      break;
  }
  return projectDetails;
}

module.exports = {
  issueTrackerPage: async (req, res) => {
    const collection = await mongoDB();
    const addedProject = await collection
      .find({ id: "addedProject" })
      .toArray();
    return res.render("issueTracker", {
      title: "Issue Tracker",
      addedProject,
    });
  },

  createProject: (req, res) => {
    return res.render("createProject", {
      title: "Create Project",
    });
  },

  addProjectToMongoDB: async (req, res) => {
    let formData = req.body;
    formData = { ...formData, id: "addedProject" };
    const collection = await mongoDB();
    collection.insertOne(formData, (err, data) => {
      if (err) {
        throw err;
      } else if (data) {
        console.log("Data inserted");
      }
    });
    res.redirect("/issueTracker");
  },

  projectDetails: async (req, res) => {
    const collection = await mongoDB();
    let projectDetails = await collection
      .find({ id: "addedProject" })
      .toArray();
    return res.render("projectDetails", {
      title: "Project Details",
      projectDetails,
    });
  },

  filterProjectDetails: async (req, res) => {
    const collection = await mongoDB();
    let projectDetails = await collection
      .find({ id: "addedProject" })
      .toArray();
    const filterReq = req.body;

    if (filterReq.flexRadio === "Project Title") {
      projectDetails = await filterBy("Title", projectDetails);
    } else if (filterReq.flexRadio === "Project Description") {
      projectDetails = await filterBy("Description", projectDetails);
    } else if (filterReq.flexRadio === "Project Author") {
      projectDetails = await filterBy("Author", projectDetails);
    }

    return res.render("projectDetails", {
      title: "Project Details",
      projectDetails,
    });
  },

  createAnIssue: async (req, res) => {
    const issueId = req.params.id;
    return res.render("createIssue", {
      title: "Create Issue",
      issueId,
    });
  },

  addAnIssue: async (req, res) => {
    const issue = req.body;
    const bugId = req.params.id;
    const collection = await mongoDB();
    await collection.findOneAndUpdate(
      { _id: ObjectId(bugId) },
      { $push: { bugs: issue } }
    );
    res.redirect("/issueTracker/projectDetails");
  },
};
