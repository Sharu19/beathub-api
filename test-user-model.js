const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB connected for testing');

    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    return testUser.validate();
  })
  .then(() => {
    console.log('Validation passed!');
    process.exit(0);
  })
  .catch(err => {
    console.log('Validation failed:', err.message);
    process.exit(1);
  });
