import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();

// POST: Track time per website
router.post('/', async (req, res) => {
  const { userId, hostname, timeSpent } = req.body;
  const date = new Date().setHours(0, 0, 0, 0);

  const existing = await Session.findOne({ userId, hostname, date });
  if (existing) {
    existing.timeSpent += timeSpent;
    await existing.save();
  } else {
    await Session.create({ userId, hostname, timeSpent, date });
  }

  res.sendStatus(200);
});

// GET: Today’s sessions for a user
router.get('/:userId/today', async (req, res) => {
  const date = new Date().setHours(0, 0, 0, 0);
  const data = await Session.find({ userId: req.params.userId, date });
  res.json(data);
});

// GET: Weekly stats for a user (last 7 days)
router.get('/:userId/weekly', async (req, res) => {
  const from = new Date();
  from.setDate(from.getDate() - 7);
  from.setHours(0, 0, 0, 0); // Normalize time

  const data = await Session.find({
    userId: req.params.userId,
    date: { $gte: from },
  });

  const summary = {};
  data.forEach(({ hostname, timeSpent }) => {
    summary[hostname] = (summary[hostname] || 0) + timeSpent;
  });

  res.json(summary);
});

export default router;
