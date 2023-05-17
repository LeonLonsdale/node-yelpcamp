import { Schema, model } from 'mongoose';
import { Review } from './review.js';

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

// ### [ Query Middleware ]

// delete reviews on a campground when that campground is deleted.
campgroundSchema.post('findOneAndDelete', async (document) => {
  if (!document) return;
  await Review.deleteMany({ _id: { $in: document.reviews } });
});

export const Campground = model('Campground', campgroundSchema);
