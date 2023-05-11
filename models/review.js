import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

export const Review = model('Review', reviewSchema);
