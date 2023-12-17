const express = require("express");
const publicRouter = express.Router();
const publicController = require("../controllers/publicController");

// Pobieranie listy postów
publicRouter.get("/posts", publicController.getPosts);

// Pobieranie konkretnego postu
publicRouter.get("/posts/:id", publicController.getPostById);

// Wysyłanie formularza kontaktowego
publicRouter.post("/contact", publicController.sendContactForm);

module.exports = publicRouter;
