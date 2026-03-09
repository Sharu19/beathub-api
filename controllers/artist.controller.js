const Artist = require('../models/Artist');
const mongoose = require('mongoose');

/**
 * CREATE Artist
 * POST /api/artists
 */
exports.createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({
      success: true,
      data: artist
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL Artists
 * GET /api/artists
 */
exports.getAllArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET Artist by ID
 * GET /api/artists/:id
 */
exports.getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Artist ID'
      });
    }

    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: artist
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE Artist
 * PUT /api/artists/:id
 */
exports.updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: artist
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE Artist
 * DELETE /api/artists/:id
 */
exports.deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
