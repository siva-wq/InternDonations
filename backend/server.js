const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const { connectDB, getDB } = require('./db/connection.js');
const donationRoutes=require('./routes/donations.js')
const userRoutes=require('./routes/users.js')
const leaderboardRoutes=require('./routes/leaderboard.js')


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


connectDB();


app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/leaderboard', leaderboardRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});