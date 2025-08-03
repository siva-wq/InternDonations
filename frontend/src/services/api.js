const API_BASE_URL = 'http://localhost:3001/api';

export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Return dummy data 
    return {
      _id: userId,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      referralCode: 'alexjohnson2025',
      totalDonations: 2450.75,
      joinDate: new Date()
    };
  }
};

export const fetchUserDonations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/donations/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching donations:', error);
  
    return [
      { _id: '1', userId, amount: 50.00, donor: 'John Doe', date: new Date('2025-01-15') },
      { _id: '2', userId, amount: 100.00, donor: 'Jane Smith', date: new Date('2025-01-16') },
      { _id: '3', userId, amount: 200.00, donor: 'Alice Brown', date: new Date('2025-01-18') }
    ];
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);

    return [
      { rank: 1, name: 'Sarah Chen', totalDonations: 3200.50, referralCode: 'sarahchen2025' },
      { rank: 2, name: 'Alex Johnson', totalDonations: 2450.75, referralCode: 'alexjohnson2025' },
      { rank: 3, name: 'Mike Rodriguez', totalDonations: 1850.25, referralCode: 'mikerodriguez2025' }
    ];
  }
};

export const addDonation = async (donationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add donation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding donation:', error);
    throw error;
  }
};
