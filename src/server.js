const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middlware = require("./middleware");
const bodyParser = require("body-parser");
require("dotenv").config();

const { User } = require("./models/User");
const { Note } = require("./models/Note");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

app.use(middlware.decodeToken);

app.get("/api/userNotes", async (req, res) => {
    const userNotes = await Note.find({ noteUser: req.user.user_id }).sort({updatedAt: -1});
    return res.status(200).json(userNotes);
});

app.post("/api/createUser", async (req, res) => {
    const newUser = new User({
        _id: req.user.user_id,
        email: req.user.email,
    });
    const checkUser = await User.exists({ _id: req.user.user_id });
    if (checkUser) {
        return;
    }
    const insertedUser = await newUser.save();
    return res.status(200).json(insertedUser);
});

app.post("/api/createNote", async (req, res) => {
    const newNote = new Note({
        noteUser: req.user.user_id,
        noteTitle: req.body.noteTitle,
        noteBody: req.body.noteBody,
    });
    const insertedNote = await newNote.save();
    return res.status(200).json(insertedNote);
});

app.put("/api/updateNote/:id", async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndUpdate(id , {
        noteTitle: req.body.noteTitle,
        noteBody: req.body.noteBody,
    });
    const insertedNote = await Note.findById(id);
    return res.status(200).json(insertedNote);
});

app.delete("/api/deleteNote/:id", async (req, res) => {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    return res.status(200).json(deletedNote);
});

const start = async () => {
    try {
        await mongoose.connect(db);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
