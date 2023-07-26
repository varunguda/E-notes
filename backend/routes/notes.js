const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUserId = require("../middleware/fetchUserId");
const routes = express.Router();
const Notes = require("../models/Notes");

routes.get("/fetchnotes", fetchUserId, async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user.id });
    return res.send(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send("{ Internal Server Error }");
  }
});

routes.post(
  "/addnote",
  fetchUserId,
  [
    body("title").isLength({ min: 1 }).withMessage("Title cannot be empty"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must contain atleast 5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Notes({
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      const savedNote = await note.save();
      return res.send(savedNote);
    } catch (err) {
      return res.status(500).send("{ Internal Server Error }");
    }
  }
);

routes.put(
  "/updatenote/:id",
  fetchUserId,
  [
    body("title").isLength({ min: 1 }).withMessage("Title cannot be empty"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must contain atleast 5 characters"),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(400).send("Note not found");
      }
      if (req.user.id !== note.userId.toString()) {
        return res.status(404).send("Not allowed!");
      }

      const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      return res.send(updatedNote);
    } catch (err) {
      return res.status(400).send("Internal Server Error!");
    }
  }
);

routes.delete("/deletenote/:id", fetchUserId, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Note not found");
    }
    console.log(note.userId.toString());
    if (req.user.id !== note.userId.toString()) {
        return res.status(404).send("Not allowed!");
    }

    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    return res.json({"Success":"Note has been deleted", deletedNote})

  } catch (err) {
    return res.status(400).send("Internal Server Error!");
  }
});

module.exports = routes;
