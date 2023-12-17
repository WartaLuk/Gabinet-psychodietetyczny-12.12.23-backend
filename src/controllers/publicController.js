const nodemailer = require("nodemailer");
const db = require("../config/dbConfig");

const transporter = nodemailer.createTransport({
  service: "gmail", // lub inny dostawca usług email
  auth: {
    user: "emailAgatyJW@gmail.com", // Email Agaty JW
    pass: "hasloAgatyJW", // Hasło do emaila Agaty JW
  },
});

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
    const { name, email, message, formOfAddress } = req.body;
    const sentBy = formOfAddress === "Pan" ? "wysłał" : "wysłała";

    // Email do Agaty JW
    const mailOptionsToAgata = {
      from: email,
      to: "emailAgatyJW@gmail.com",
      subject: `Nowa wiadomość od ${name}`,
      text: `Otrzymałaś nową wiadomość od ${name} (${email}):\n\n${message}`,
    };

    // Email z kopią do klienta
    const mailOptionsToClient = {
      from: "emailAgatyJW@gmail.com",
      to: email,
      subject:
        "Kopia Twojej wiadomości do Gabinetu Psychodietetycznego Agaty JW",
      text: `Dzień dobry,

Dziękuję ${formOfAddress} za przesłanie wiadomości na stronie Gabinet Psychodietetyczny Agaty JW,
Odpowiem na maila w ciągu 24 godzin.
Przesyłam kopię wiadomości, którą ${formOfAddress} ${sentBy}:
"${message}"
z wyrazami szacunku,

Agata JW.`,
    };

    transporter.sendMail(mailOptionsToAgata, (error, info) => {
      if (error) {
        return res
          .status(500)
          .send("Błąd podczas wysyłania emaila do Agaty JW");
      }
      transporter.sendMail(mailOptionsToClient, (error, info) => {
        if (error) {
          return res
            .status(500)
            .send("Błąd podczas wysyłania kopii emaila do klienta");
        }
        res
          .status(200)
          .send({ message: "Formularz kontaktowy został wysłany" });
      });
    });
  },
};

module.exports = publicController;
