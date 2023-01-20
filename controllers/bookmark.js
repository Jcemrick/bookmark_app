const router = require('express').Router();
const { response } = require('express');
const Bookmark = require('../model/bookmark.js')

// Index
router.get('/', async (req, res) => {
    try {
        res.json(await Bookmark.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create Bookmark
router.post('/', async (req, res) => {
    try {
        res.json(await Bookmark.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

// Update Bookmark
router.put('/:id', async (req,res) => {
    try {
        res.json(
            await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete Bookmark
router.delete('/:id', async (req, res) => {
    try {
        res.json(await Bookmark.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Show Bookmark
router.get('/:id', async (req, res) => {
    try {
        res.json(await Bookmark.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router