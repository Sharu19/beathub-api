import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.resolve(__dirname, '.gitignore/.env') });
}

import Artist from './models/Artist.js';
import Album from './models/Album.js';
import Song from './models/Song.js';
import User from './models/User.js';
import Playlist from './models/Playlist.js';

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
      releaseYear: 2026,
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
      createdBy: user._id,
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
