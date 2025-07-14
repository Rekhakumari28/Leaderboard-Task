const express = require('express');
const router = express.Router();
const LeaderboardUser = require('../models/user.model.js');
const ClaimHistory = require('../models/claimHistory.model.js');

router.get('/users', async (req, res) => {
  const users = await LeaderboardUser.find().sort({ totalPoints: -1 });
  res.json(users);
});


router.post('/users', async (req, res) => {
  const newUser = new LeaderboardUser({ name: req.body.name });
  await newUser.save();
  res.status(201).json(newUser);
});


router.post('/claim/:userId', async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await LeaderboardUser.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.totalPoints += points;
  await user.save();

  await ClaimHistory.create({ userId, points });

  const updatedUsers = await LeaderboardUser.find().sort({ totalPoints: -1 });

  res.json({ message: "Points claimed", user, points, leaderboard: updatedUsers });
});


module.exports = router;