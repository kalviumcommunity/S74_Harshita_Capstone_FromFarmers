const express = require('express');
const router = express.Router();
const BulkBuddy = require('../models/BulkBuddy');
const { body, validationResult } = require("express-validator");


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

// GET: All groups (DISCOVER GROUP)
router.get('/', async (req, res) => {
  try {
    const groups = await BulkBuddy.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Group by ID (MY GROUPS)
router.get('/:id', async (req, res) => {
  try {
    const group = await BulkBuddy.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update BulkBuddy group by ID 
router.put(
  "/:id",
  [
    body("groupName")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Group name must be at least 8 characters long"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("location")
      .optional()
      .notEmpty()
      .withMessage("Location is required"),
    body("groupImage")
      .optional()
      .isURL()
      .withMessage("Group image must be a valid URL"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const groupId = req.params.id;
      const updateFields = req.body;

      const updatedGroup = await BulkBuddy.findByIdAndUpdate(
        groupId,
        updateFields,
        { new: true }
      );

      if (!updatedGroup) {
        return res.status(404).json({ message: "Group not found" });
      }

      res.status(200).json({
        message: "BulkBuddy group updated successfully",
        data: updatedGroup,
      });
    } catch (error) {
      console.error("PUT error:", error.message);
      res.status(500).json({ error: "Server error while updating group" });
    }
  }
);

module.exports = router;
