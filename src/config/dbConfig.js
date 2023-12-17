const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost", // Adres serwera bazy danych
  user: "twoj_uzytkownik", // Nazwa użytkownika bazy danych
  password: "twoje_haslo", // Hasło do bazy danych
  database: "nazwa_bazy_danych", // Nazwa bazy danych
});

dbConnection.connect((error) => {
  if (error) {
    console.error("Błąd połączenia z bazą danych:", error);
    return;
  }
  console.log("Połączono z bazą danych");
});

module.exports = dbConnection;
