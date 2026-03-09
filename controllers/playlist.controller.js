const Playlist = require('../models/Playlist');
require('../models/User');
require('../models/Song');

exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist
      .find()
      .populate('owner')
      .populate('songs');

    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
