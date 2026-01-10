const Group = require("../models/groupModel"); // This is now a Mongoose Model

const testGroup = (req, res) => {
  res.send("Group route works!");
};

// 1. Create Group (Updated for MongoDB)
const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    
    // Create a new document using the Mongoose Model
    const newGroup = new Group({
      name,
      members
    });

    // Save to MongoDB
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(500).json({ message: "Error creating group: " + err.message });
  }
};

// 2. List Groups (Updated for MongoDB)
const listGroups = async (req, res) => {
  try {
    // .find() returns all documents from the groups collection
    const allGroups = await Group.find();
    
    // Send the array to the frontend
    res.json(allGroups); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching groups: " + err.message });
  }
};

module.exports = { testGroup, createGroup, listGroups };