import mongoose, { connect } from 'mongoose';
import { Campground } from '../models/campground.js';
import cities from './cities.js';
import { places, descriptors } from './seedHelpers.js';

async function main() {
  await connect('mongodb://localhost:27017/yelp-camp').then(() =>
    console.log('Connected to MongoDB')
  );
}
await main().catch((err) => console.log('Error connecting to Mongo: ', err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <= 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      author: '6460fbb1a13a782a30ee4d72',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget dolor morbi non arcu risus quis varius quam quisque. Facilisis leo vel fringilla est ullamcorper eget nulla. Enim nulla aliquet porttitor lacus luctus.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dgfnzfd9q/image/upload/v1684348898/YelpCamp/o7pucz8vg8vgvz08xz5o.png',
          filename: 'YelpCamp/o7pucz8vg8vgvz08xz5o',
        },
        {
          url: 'https://res.cloudinary.com/dgfnzfd9q/image/upload/v1684348898/YelpCamp/fzn3owv0c5uvcxhkzba6.png',
          filename: 'YelpCamp/fzn3owv0c5uvcxhkzba6',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
