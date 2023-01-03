const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Review = require('../models/Review')

// @desc    Show add page
// @route   GET /reviews/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('reviews/add')
})

// @desc    Process add form
// @route   POST /reviews
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Review.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router