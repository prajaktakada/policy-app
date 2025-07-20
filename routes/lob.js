const express = require('express');
const router = express.Router();
const LOB = require('../models/LOB');

router.post('/createlob', async (req, res) => {
  try {
    const lob = new LOB({ categoryName: req.body.categoryName });
    await lob.save();
    res.status(201).json(lob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/getAllLob', async (req, res) => {
  try {
    const lobs = await LOB.find();
    res.json(lobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
