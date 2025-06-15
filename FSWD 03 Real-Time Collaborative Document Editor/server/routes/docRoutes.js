const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Get document by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update document
router.post('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        id: req.params.id, // Explicitly store it
        title,
        content,
        updatedAt: new Date()
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
