// Dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT ?? 3333
const bookmarkRouter = require('./controllers/bookmark')


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/bookmark', bookmarkRouter)


// Routes
// Test
app.get('/', (req, res) => {
    console.log("Hello World");
});


// Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));