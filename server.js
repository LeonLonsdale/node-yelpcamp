// ### [ Imports]

// packages
import mongoose, { connect } from 'mongoose';

// custom modules
import { app } from './app.js';

// ### [ Server Connections ]
const DB_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_HOST
    : 'mongodb://localhost:27017/yelp-camp';
const port = process.env.PORT || 3000;

// database
async function main() {
  await connect(process.env.MONGODB_HOST).then(() =>
    console.log('Connected to MongoDB')
  );
}
await main().catch((err) => console.log('Error connecting to Mongo: ', err));

// server
app.listen(port, () => console.log(`Server running on ${port}`));
