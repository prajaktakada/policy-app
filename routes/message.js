const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/schedule-message', async (req, res) => {
  const { message, day, time } = req.body;
  const scheduleTime = new Date(`${day}T${time}:00`);
  const delay = scheduleTime - new Date();

  if (delay < 0) return res.status(400).send('Time must be in the future');

  setTimeout(async () => {
    const msg = new Message({ message, createdAt: new Date() });
    await msg.save();
    console.log('Message saved at scheduled time');
  }, delay);

  res.send('Message scheduled');
});

module.exports = router;
