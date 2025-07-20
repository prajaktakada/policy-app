const express = require('express');
const multer = require('multer');
const path = require('path');
const { Worker } = require('worker_threads');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  const workerPath = path.resolve(__dirname, 'workers', 'uploadWorker.js');

  const worker = new Worker(workerPath, {
    workerData: {
      filePath: req.file.path,
    },
  });

  worker.on('message', () => {
    res.send('File processed and data saved!');
  });

  worker.on('error', err => res.status(500).send(err.message));
});

module.exports = router;
