require('dotenv').config();
const mongoose = require('mongoose');
const Artist = require('./models/Artist');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('DB connected for artist test');

    const badArtist = new Artist({
      name: 'Time Traveler',
      genre: 'Classical',   // ❌ Not allowed
      debutYear: 1850,      // ❌ Too old
      bio: 'Hi'             // ❌ Too short
    });

    await badArtist.save();
  })
  .catch(error => {   // ✅ DOT ADDED HERE
    if (error.name === 'ValidationError') {
      console.log('VALIDATION FAILED');
      for (let field in error.errors) {
        console.log(error.errors[field].message);
      }
    } else {
      console.log(error);
    }
  })
  .finally(() => {
    mongoose.connection.close();
  });
