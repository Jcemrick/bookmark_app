// Dependencies 
require('dotenv').config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


// Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on('open', () => console.log('You are connected to MongoDB!'))
    .on('close', () => console.log('You are disconnected from MongoDB!'))
    .on('error', (error) => console.log(error))


// Bookmark Model
const BookmarkSchema = new mongoose.Schema({
    title: String,
    url: String
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes
// Test
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Index
app.get('/bookmark', async (req, res) => {
    try {
        res.json(await Bookmark.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create Bookmark
app.post('/bookmark', async (req, res) => {
    try {
        res.json(await Bookmark.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

// Update Bookmark
app.put('bookmark/:id', async (req,res) => {
    try {
        res.json(
            await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete Bookmark
app.delete('/bookmark/:id', async (req, res) => {
    try {
        res.json(await Bookmark.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Show Bookmark
app.get('/bookmark/:id', async (req, res) => {
    try {
        res.json(await Bookmark.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error)
    }
})



// Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));