// ### [ Imports]

// packages
import mongoose, {connect} from 'mongoose';

// custom modules
import {app} from './app.js';

// ### [ Server Connections ]

const port = 3000;

// database
async function main() {
  await connect('mongodb://localhost:27017/yelp-camp').then(() =>
    console.log('Connected to MongoDB')
  );
}
await main().catch((err) => console.log('Error connecting to Mongo: ', err));

// server
app.listen(port, () => console.log(`Server running on ${port}`));
