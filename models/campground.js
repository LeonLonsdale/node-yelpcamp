import { Schema, model } from 'mongoose';
import { Review } from './review.js';

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual('thumb').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

const campgroundSchema = new Schema(
  {
    title: String,
    images: [imageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
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
  },
  opts
);

// campgroundSchema.set('toObject', { virtuals: true });
// campgroundSchema.set('toJSON', { virtuals: true });

campgroundSchema.virtual('properties.popupMarkup').get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p style="margin-bottom: 0">${this.location}</p><p>$${this.price} / night</p>`;
});

// campgroundSchema.virtual('properties.popUpMarkup').get(function () {
//   return `
//     <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
//     <p>${this.description.substring(0, 20)}...</p>`;
// });
// ### [ Query Middleware ]

// delete reviews on a campground when that campground is deleted.
campgroundSchema.post('findOneAndDelete', async (document) => {
  if (!document) return;
  await Review.deleteMany({ _id: { $in: document.reviews } });
});

// ### [ Virtual ]

export const Campground = model('Campground', campgroundSchema);
