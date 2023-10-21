const express = require('express')
const router = express.Router()
const Notes = require("../Models/Notes")
const fetchUserData = require('../Middleware/fetchUserData');
require("dotenv").config()
const { body, validationResult } = require('express-validator');

// Route 1 Adding a notes using POST . /api/notes/addnotes  login is required ...

router.post('/addnotes', fetchUserData,
    // Adding a validation
    [body('title', "Title must be atleast 3 characters").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 })], async (req, res) => {

        // Check if there is an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { title, description } = req.body;
        try {
            // Adding a notes to the database
            let notes = await Notes.create({
                title, description, user: req.userDataReq.id
            })
            res.json(notes)
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    })


// Route 2 Getting all the notes using get . /api/notes/fetchnotes  login is required ...

router.get('/fetchnotes', fetchUserData, async (req, res) => {
    try {
        // Finding a notes using id (Not a note id)
        const notes = await Notes.find({ user: req.userDataReq.id })
        res.json(notes)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 Updating a notes using put . /api/notes//updatenotes/(:Id)  login is required ...

router.put('/updatenotes/:id', fetchUserData, async (req, res) => {

    try {
        const { title, description } = req.body

        // Creating a empty object to hold the title and description values.
        let updatenotes = {}
        if (title) { updatenotes.title = title }
        if (description) { updatenotes.description = description }

        // Finding Id from a header using req.params
        let note = await Notes.findById(req.params.id)
        // If Id is not provided .
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Checking if the note is updating by the acctual and authorized user or not
        if (note.user.toString() !== req.userDataReq.id) {
            return res.status(404).send("Not Found")
        }
        // findByIdAndUpdate has 3 arguments
        // Updating the notes using findByIdAndUpdate (Id of the document , Updated notes , {new: true }(For update or overwrite the notes ))
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: updatenotes }, { new: true })
        res.json({ note })

    }
    catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

})

// Route 4 Deleting a notes using delete . /api/notes//deletenote/:id  login is required ...

router.delete('/deletenote/:id', fetchUserData, async (req, res) => {

    try {
        // Finding Id from a header using req.params
        let note = await Notes.findById(req.params.id)
        if (!note) {
            // If Id is not provided .
            return res.status(404).send("Not Found")
        }
        // Checking if the note is updating by the acctual and authorized user or not
        if (note.user.toString() !== req.userDataReq.id) {
            return res.status(404).send("Not Found")
        }
        // Deleting the notes using findByIdAndDelete (Id of a document)
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ note })
        // res.send("Delete successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }


})

module.exports = router