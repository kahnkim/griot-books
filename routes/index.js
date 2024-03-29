const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Review = require('../models/Review')

// Login/Landing page
// GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// Dashboard
// GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            reviews
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})
module.exports = router