import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    releaseYear: {
      type: Number,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Album', albumSchema);
