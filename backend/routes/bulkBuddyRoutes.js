const express = require('express');
const router = express.Router();
const BulkBuddy = require('../models/BulkBuddy');

// POST: Create a new group (CREATE GROUP)
router.post('/', async (req, res) => {
  try {
    const { groupName, description, location, groupImage } = req.body;

    const newGroup = new BulkBuddy({ groupName, description, location, groupImage });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
