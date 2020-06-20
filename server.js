// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/html/notes.html"));
  console.log("notes!");
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db.json"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});
app.get;
app.post;
app.delete;
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
