import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { fetchLeaderboard } from '../services/api';
import '../styles/Leaderboard.css';

const Leaderboard = ({ onBack, currentUser }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="rank-icon gold" />;
      case 2:
        return <Medal className="rank-icon silver" />;
      case 3:
        return <Award className="rank-icon bronze" />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Donation Leaderboard</h1>
        <p>See how you rank among all interns</p>
      </header>

      <main className="leaderboard-main">
        <div className="leaderboard-card">
          <div className="leaderboard-list">
            {leaderboard.map((intern, index) => (
              <div 
                key={index} 
                className={`leaderboard-item ${intern.name === currentUser?.name ? 'current-user' : ''}`}
              >
                <div className="rank-section">
                  {getRankIcon(intern.rank)}
                </div>
                
                <div className="intern-info">
                  <h3>{intern.name}</h3>
                  <p className="referral-code">{intern.referralCode}</p>
                </div>
                
                <div className="donation-amount">
                  <span className="amount">${intern.totalDonations.toLocaleString()}</span>
                  <span className="label">raised</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="personal-stats">
          <h3>Your Position</h3>
          <div className="personal-rank">
            {leaderboard.find(intern => intern.name === currentUser?.name) && (
              <div className="rank-display">
                <span className="your-rank">
                  #{leaderboard.find(intern => intern.name === currentUser?.name)?.rank}
                </span>
                <span className="rank-label">out of {leaderboard.length} interns</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
