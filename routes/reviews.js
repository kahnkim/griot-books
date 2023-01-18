const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Review = require('../models/Review')
const { populate } = require('../models/User')

// Show add page
// GET /reviews/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('reviews/add')
})

// Process add form
// POST /reviews
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

// Show all reviews
// GET /reviews
router.get('/', ensureAuth, async (req, res) => {
    try {
        const reviews = await Review.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
    res.render('reviews/index', {reviews,})
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// Show single review page
// GET /reviews/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let review = await Review.findById(req.params.id)
            .populate('user')
            .lean()
        
        if (!review) {
            return res.render('error/404')
        }
        // If user id does not match the user id for review & review is private
        if (review.user._id != req.user.id && review.status == 'private') {
            res.render('error/404')
        } else {
            res.render('reviews/show', { review })
        }
    } catch (err) {
        console.error(err)
        res.render('error/404')
    }
})

// Show edit page
// GET /reviews/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.id
        })
            .lean()
    
        if(!review) {
            return res.render('error/404')
        }
    
        if (review.user != req.user.id) {
            res.redirect('/reviews')
        } else {
            res.render('reviews/edit', {
                review,
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }

})

// Update/edit review
// PUT /reviews/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let review = await Review.findById(req.params.id).lean()
    
        if (!review) {
          return res.render('error/404')
        }
    
        if (review.user != req.user.id) {
          res.redirect('/reviews')
        } else {
          review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
          })
    
          res.redirect('/dashboard')
        }
      } catch (err) {
        console.error(err)
        return res.render('error/500')
      }
})

// Delete review
// DELETE /reviews/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Review.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// User reviews
// GET /reviews/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const reviews = await Review.find({
        user: req.params.userId,
        status: 'public',
    })
        .populate('user')
        .lean()

    res.render('user', { 
        name: req.user.firstName,
        reviews
    })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// Search reviews by title
// GET /reviews/search/:query
router.get('/search/:query', ensureAuth, async (req, res) => {
    try {
        const reviews = await Review.find({title: new RegExp(req.query.query,'i'), status: 'public'})
        .populate('user')
        .sort({ createdAt: 'desc'})
        .lean()
        res.render('reviews/index', { reviews })
    } catch(err){
        console.log(err)
        res.render('error/404')
    }
})

module.exports = router