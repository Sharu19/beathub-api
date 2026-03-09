const express = require('express');
const router = express.Router();

const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist
} = require('../controllers/artist.controller');

// CREATE
router.post('/', createArtist);

// READ
router.get('/', getAllArtists);
router.get('/:id', getArtistById);

// UPDATE
router.put('/:id', updateArtist);

// DELETE
router.delete('/:id', deleteArtist);

module.exports = router;
