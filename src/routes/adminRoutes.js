const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Middleware do weryfikacji autoryzacji (możesz dodać własną logikę autoryzacji)
const verifyAuth = (req, res, next) => {
  // Przykładowa logika weryfikacji
  if (!req.isAuthenticated()) {
    return res.status(403).send("Brak dostępu");
  }
  next();
};

// Dodawanie nowego postu
router.post("/posts", verifyAuth, adminController.addPost);

// Edytowanie istniejącego postu
router.put("/posts/:id", verifyAuth, adminController.editPost);

// Usuwanie postu
router.delete("/posts/:id", verifyAuth, adminController.deletePost);

module.exports = router;
