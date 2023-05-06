// ### [ Imports ]

import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

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
