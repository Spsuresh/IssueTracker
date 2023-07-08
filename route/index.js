const express = require('express');
const router = express.Router();
const issueTrackerPath = require('./issueTracker');

router.get('/', (req, res) => {
  res.redirect('/issueTracker');
});

router.use('/issueTracker', issueTrackerPath);

module.exports = router;
