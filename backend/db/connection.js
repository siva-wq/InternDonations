const MongoClient = require('mongodb');

let db = null;
let client = null;

// Dummy data simulation
const collections = {
  users: [
    {
      _id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      referralCode: 'alexjohnson2025',
      totalDonations: 2450.75,
      joinDate: new Date('2025-01-01')
    },
    {
      _id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      referralCode: 'sarahchen2025',
      totalDonations: 3200.50,
      joinDate: new Date('2025-01-01')
    },
    {
      _id: '3',
      name: 'Mike Rodriguez',
      email: 'mike@example.com',
      referralCode: 'mikerodriguez2025',
      totalDonations: 1850.25,
      joinDate: new Date('2025-01-01')
    }
  ],
  donations: [
    { _id: '1', userId: '1', amount: 50.00, donor: 'John Doe', date: new Date('2025-01-15') },
    { _id: '2', userId: '1', amount: 100.00, donor: 'Jane Smith', date: new Date('2025-01-16') },
    { _id: '3', userId: '2', amount: 75.00, donor: 'Bob Wilson', date: new Date('2025-01-17') },
    { _id: '4', userId: '1', amount: 200.00, donor: 'Alice Brown', date: new Date('2025-01-18') }
  ]
};

const initializeDummyData = async () => {
  console.log('Dummy data initialized');
};

const connectDB = async () => {
  try {
    console.log('Simulating MongoDB connection...');
    await initializeDummyData();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const getDB = () => {
  return {
    collection: (name) => ({
      find: () => ({
        toArray: () => Promise.resolve(collections[name] || [])
      }),
      findOne: (query) => {
        const collection = collections[name] || [];
        return Promise.resolve(
          collection.find(item => 
            Object.keys(query).every(key => item[key] === query[key])
          )
        );
      },
      insertOne: (doc) => {
        const collection = collections[name] || [];
        const newDoc = { ...doc, _id: String(Date.now()) };
        collection.push(newDoc);
        return Promise.resolve({ insertedId: newDoc._id });
      },
      updateOne: (query, update) => {
        const collection = collections[name] || [];
        const index = collection.findIndex(item =>
          Object.keys(query).every(key => item[key] === query[key])
        );
        if (index !== -1) {
          Object.assign(collection[index], update.$set || update);
        }
        return Promise.resolve({ modifiedCount: index !== -1 ? 1 : 0 });
      }
    })
  };
};

module.exports = { connectDB, getDB, collections };
