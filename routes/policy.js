const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');

router.post('/createPolicy', async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/getAllPolicies', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
