const express = require('express');
const { getDB } = require('../db/connection.js');

const router = express.Router();


router.get('/user/:userId', async (req, res) => {
  try {
    const db = getDB();
    const donations = await db.collection('donations').find().toArray();
    const userDonations = donations.filter(d => d.userId === req.params.userId);
    
    res.json(userDonations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/total/:userId', async (req, res) => {
  try {
    const db = getDB();
    const donations = await db.collection('donations').find().toArray();
    const userDonations = donations.filter(d => d.userId === req.params.userId);
    const total = userDonations.reduce((sum, donation) => sum + donation.amount, 0);
    
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const donation = {
      ...req.body,
      date: new Date()
    };
    
    const result = await db.collection('donations').insertOne(donation);
    res.status(201).json({ id: result.insertedId, ...donation });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
