const mongoose = require('mongoose');

const bulkBuddySchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    minlength: 8,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  groupImage: {
    type: String,
    default: '', // optional
  }
}, { timestamps: true });

module.exports = mongoose.model('BulkBuddy', bulkBuddySchema);
