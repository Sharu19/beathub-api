import Album from '../models/Album.js';

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album
      .find()
      .populate('artist')
      .populate('songs');

    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
