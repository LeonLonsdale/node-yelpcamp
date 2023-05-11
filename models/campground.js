import { Schema, model } from 'mongoose';

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

export const Campground = model('Campground', campgroundSchema);
