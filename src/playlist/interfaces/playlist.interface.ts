import mongoose from 'mongoose';

export class PlaylistSong {
  addedBy: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
  dateAdded: string;
  song: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Song';
  };
}
