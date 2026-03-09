import express from 'express';
import { getAllAlbums } from '../controllers/album.controller.js';

const router = express.Router();

router.get('/', getAllAlbums);

export default router;
