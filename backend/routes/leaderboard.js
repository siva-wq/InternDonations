const express = require('express');
const { getDB } = require('../db/connection.js');

const router = express.Router();

// Get leaderboard data
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();

    // Sort users by total donations in descending order
    const leaderboard = users
      .sort((a, b) => b.totalDonations - a.totalDonations)
      .map((user, index) => ({
        rank: index + 1,
        name: user.name,
        totalDonations: user.totalDonations,
        referralCode: user.referralCode
      }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // ✅ CommonJS export
