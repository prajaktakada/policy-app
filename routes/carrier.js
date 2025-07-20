const express = require('express');
const router = express.Router();
const Carrier = require('../models/Carrier');

router.post('/createCarrier', async (req, res) => {
  try {
    const carrier = new Carrier({ companyName: req.body.companyName });
    await carrier.save();
    res.status(201).json(carrier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/getAllCarriers', async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
