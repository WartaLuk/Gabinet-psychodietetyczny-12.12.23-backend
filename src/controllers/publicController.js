const db = require("../config/dbConfig");

const publicController = {
  getPosts: (req, res) => {
    const query = "SELECT * FROM posts";

    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).send("Błąd podczas pobierania postów");
      }
      res.status(200).send(results);
    });
  },

  getPostById: (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM posts WHERE id = ?";

    db.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).send("Błąd podczas pobierania postu");
      }
      if (results.length === 0) {
        return res.status(404).send("Post nie został znaleziony");
      }
      res.status(200).send(results[0]);
    });
  },

  sendContactForm: (req, res) => {

    res.status(200).send({ message: "Formularz kontaktowy został wysłany" });
  },
};

module.exports = publicController;
