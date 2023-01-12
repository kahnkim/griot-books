const express = require('express')
const passport = require('passport')
const router = express.Router()

// Auth with Google
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'], prompt : "select_account"})) // Added for macbook auto log in - to choose account

// Google auth callback
// GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

// Logout user
// GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })

module.exports = router