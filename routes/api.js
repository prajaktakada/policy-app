const express = require('express');
const User = require('../models/User');
const Policy = require('../models/Policy');

const router = express.Router();

router.get('/search-policy/:username', async (req, res) => {
  const user = await User.findOne({ firstName: req.params.username });
  if (!user) return res.status(404).send('User not found');

  const policies = await Policy.find({ userId: user._id });
  res.json(policies);
});

router.get('/aggregate-policy', async (req, res) => {
  const result = await Policy.aggregate([
    {
      $group: {
        _id: "$userId",
        totalPolicies: { $sum: 1 }
      }
    }
  ]);
  res.json(result);
});

module.exports = router;