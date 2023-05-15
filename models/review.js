import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Review = model('Review', reviewSchema);
