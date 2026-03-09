require('dotenv').config();
const mongoose = require('mongoose');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Song = require('./models/Song');
const User = require('./models/User');
const Playlist = require('./models/Playlist');

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB connected for seeding');

    // Clear existing collections
    await Promise.all([
      Artist.deleteMany({}),
      Album.deleteMany({}),
      Song.deleteMany({}),
      User.deleteMany({}),
      Playlist.deleteMany({})
    ]);

    // Create Artist
    const artist = await Artist.create({
      name: 'BeatHub Artist',
      genre: 'Pop'
    });

    // Create Album
    const album = await Album.create({
      title: 'First Album',
      artist: artist._id,
      songs: []
    });

    // Create Song
    const song = await Song.create({
      title: 'First Song',
      duration: 210,
      artist: artist._id,
      album: album._id
    });

    // Link Album ↔ Song
    album.songs.push(song._id);
    await album.save();

    // Link Artist ↔ Album & Song
    artist.albums.push(album._id);
    artist.songs.push(song._id);
    await artist.save();

    // Create User
    const user = await User.create({
      username: 'kalvian',
      email: 'kalvian@example.com',
      password: 'password123'
    });

    // Create Playlist
    await Playlist.create({
      name: 'My Playlist',
      description: 'Seeded playlist',
      owner: user._id,
      songs: [song._id]
    });

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDB();
