const db = require("../config/dbConfig");

const adminController = {
  addPost: (req, res) => {
    const { title, content } = req.body;
    const query = "INSERT INTO posts (title, content) VALUES (?, ?)";

    db.query(query, [title, content], (error, results) => {
      if (error) {
        return res.status(500).send("Błąd podczas dodawania postu");
      }
      res.status(201).send({ id: results.insertId, title, content });
    });
  },

  editPost: (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";

    db.query(query, [title, content, id], (error, results) => {
      if (error) {
        return res.status(500).send("Błąd podczas edytowania postu");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Post nie został znaleziony");
      }
      res.status(200).send({ id, title, content });
    });
  },

  deletePost: (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM posts WHERE id = ?";

    db.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).send("Błąd podczas usuwania postu");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Post nie został znaleziony");
      }
      res.status(200).send({ message: "Post został usunięty" });
    });
  },
};

module.exports = adminController;
