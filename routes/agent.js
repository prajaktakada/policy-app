const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

// Create new agent
router.post('/createAgent', async (req, res) => {
  try {
    const agent = new Agent({ name: req.body.name });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all agents
router.get('/getallAgent', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
