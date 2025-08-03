import React, { useState, useEffect } from 'react';
import { LogOut, Trophy, Gift, Target, DollarSign, Users, Share2 } from 'lucide-react';
import { fetchUserData, fetchUserDonations } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout, onNavigateToLeaderboard }) => {
  const [userData, setUserData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [userInfo, userDonations] = await Promise.all([
          fetchUserData(user.id),
          fetchUserDonations(user.id),
        ]);

        setUserData(userInfo);
        setDonations(userDonations);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user.id]);

  const copyReferralCode = () => {
    if (userData?.referralCode) {
      navigator.clipboard.writeText(userData.referralCode);
      alert('Referral code copied to clipboard!');
    }
  };

  const rewards = [
    { name: 'Bronze Donor', threshold: 500, unlocked: (userData?.totalDonations || 0) >= 500 },
    { name: 'Silver Supporter', threshold: 1000, unlocked: (userData?.totalDonations || 0) >= 1000 },
    { name: 'Gold Contributor', threshold: 2000, unlocked: (userData?.totalDonations || 0) >= 2000 },
    { name: 'Platinum Champion', threshold: 5000, unlocked: (userData?.totalDonations || 0) >= 5000 },
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Donation Dashboard</h1>
          <div className="header-actions">
            <button onClick={onNavigateToLeaderboard} className="nav-button">
              <Trophy size={20} />
              Leaderboard
            </button>
            <button onClick={onLogout} className="logout-button">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome back, {userData?.name || 'User'}!</h2>
          <p>Track your donation progress and unlock rewards</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <DollarSign size={32} />
            </div>
            <div className="stat-content">
              <h3>Total Raised</h3>
              <p className="stat-value">${userData?.totalDonations?.toLocaleString() || '0'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Users size={32} />
            </div>
            <div className="stat-content">
              <h3>Total Donors</h3>
              <p className="stat-value">{donations.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Target size={32} />
            </div>
            <div className="stat-content">
              <h3>Next Goal</h3>
              <p className="stat-value">$5,000</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card referral-card">
            <h3>
              <Share2 size={24} />
              Your Referral Code
            </h3>
            <div className="referral-code-container">
              <code className="referral-code">{userData?.referralCode || 'N/A'}</code>
              <button onClick={copyReferralCode} className="copy-button">
                Copy
              </button>
            </div>
            <p className="referral-description">
              Share this code with potential donors to track your progress
            </p>
          </div>

          <div className="card rewards-card">
            <h3>
              <Gift size={24} />
              Rewards & Unlockables
            </h3>
            <div className="rewards-list">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className={`reward-item ${reward.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="reward-info">
                    <span className="reward-name">{reward.name}</span>
                    <span className="reward-threshold">${reward.threshold}</span>
                  </div>
                  <div className={`reward-status ${reward.unlocked ? 'unlocked' : 'locked'}`}>
                    {reward.unlocked ? '✓' : '🔒'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card recent-donations">
          <h3>Recent Donations</h3>
          {donations.length > 0 ? (
            <div className="donations-list">
              {donations.slice(0, 5).map((donation, index) => (
                <div key={index} className="donation-item">
                  <div className="donation-info">
                    <span className="donor-name">{donation.donor}</span>
                    <span className="donation-date">
                      {new Date(donation.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="donation-amount">${donation.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-donations">No donations yet. Start sharing your referral code!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
