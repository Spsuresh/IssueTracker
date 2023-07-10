     npm install 
     npm start

### Features
# HomePage 
A list of projects will be displayed.A button will be provided to create a new project. Upon the creation of a new project, it will be added to the list

# CreateProjectPage
The following fields will be accepted to create a project:

Name
Description
Author

# ProjectDetailsPage
Upon clicking on a project on the home page, the user will be redirected to the Project Detail Page, where they will be able to view bugs related to that project. The following actions can be performed by the user on this page:

Multiple labels can be filtered by (i.e., the user can filter by 2 or more labels simultaneously).
Filtering by author is possible.
Title and description can be searched by.
A button will be provided to create an issue.

# CreateIssuePage
The user will be able to create an issue for a project on the Create Issue Page. The following fields will be accepted:

Title
Description
Author

### Folder Structure

# IssueTracker
 |                               |-->createProject.css
 |assets------->|----->css------>|-->footer.css
 |                               |-->header.css
 |                               |-->issueTracker.css
 |                               |-->layout.css
 |                               |-->projectDetails.css
 |controller--->|-->issuecontroller.js         
 |database----->|--->mongodb.js            
 |              |
 |route-------->|-->index.js
 |              |-->issueTracker.js             
 |              |--->_header.ejs
 |views-------->|---> _footer.ejs
 |              |--->admicreateissue.ejs
 |              |--->createProject.ejs
 |              |--->issueTracker.ejs
 |              |--->layout.ejs
 |              |--->projectDetails.ejs
 |node_modules
 |index.js
 |package-lock.json
 |package.json
 