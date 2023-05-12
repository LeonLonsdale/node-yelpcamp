import { Schema, model } from 'mongoose';
import { Review } from './review.js';

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

// ### [ Query Middleware ]

campgroundSchema.post('findOneAndDelete', async (document) => {
  if (!document) return;
  await Review.deleteMany({ _id: { $in: document.reviews } });
});

export const Campground = model('Campground', campgroundSchema);
