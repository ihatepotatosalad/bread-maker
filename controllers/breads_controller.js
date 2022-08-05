const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
//index
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
        })

    // res.render('index',
    //     {
    //         breads: Bread
    //     })


})
// NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
})


// SHOW
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBreads => {
            const bakedBy = foundBreads.getBakedBy()
            console.log(bakedBy)
            res.render('show', {
                bread: foundBreads
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
})
// DELETE
breads.delete('/:indexArray', (req, res) => {
    Bread.findByIdAndDelete(req.params.indexArray)
        .then(deletedBread => {
            res.status(303).redirect('/breads')
        })

})
// UPDATE
breads.put('/:arrayIndex', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, { new: true })
        .then(updatedBread => {
            res.redirect(`/breads/${req.params.arrayIndex}`)
        })

})
// EDIT
breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('edit', {
                bread: foundBread
            })
        })
})





module.exports = breads