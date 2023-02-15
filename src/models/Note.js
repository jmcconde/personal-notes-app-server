const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        noteUser: { type: String, required: true },
        noteTitle: { type: String, required: true },
        noteBody: { type: String, required: true },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = { Note };
