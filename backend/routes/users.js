const express = require('express');
const { getDB } = require('../db/connection.js'); 

const router = express.Router();


router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ _id: req.params.id });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('users').updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
