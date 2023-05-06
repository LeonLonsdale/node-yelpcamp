// ### [ Imports ]

// packages
import express from 'express';

// node modules
import path from 'path';
import {fileURLToPath} from 'url';

// custom modules
import {Campground} from './models/campground.js';

// ### [ Declarations ]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ### [ Create App ]

export const app = express();

// ### [ Express Middleware ]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ### [ Routes ]

app.get('/', (req, res) => res.render('home.ejs'));
app.get('/test-campground', async (req, res) => {
  const camp = new Campground({
    title: 'Some rando campground',
    description: `not even real, don't pay`,
  });
  await camp.save();
  res.send(camp);
});
