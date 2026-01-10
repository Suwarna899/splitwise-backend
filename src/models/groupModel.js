const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  members: { 
    type: [String], 
    default: [] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// This creates the 'groups' collection in MongoDB and provides .findOne()
module.exports = mongoose.model("Group", groupSchema);