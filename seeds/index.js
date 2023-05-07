import mongoose, {connect} from 'mongoose';
import {Campground} from '../models/campground.js';
import cities from './cities.js';
import {places, descriptors} from './seedHelpers.js';

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
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());