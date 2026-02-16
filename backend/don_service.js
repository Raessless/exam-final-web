const db = require("./db_connect");

exports.getDons = (req, res) => {
  db.query("SELECT * FROM don ORDER BY date_don", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.addDon = (req, res) => {
  const { type, quantite } = req.body;

  db.query(
    "INSERT INTO don(type, quantite, date_don) VALUES (?, ?, CURDATE())",
    [type, quantite],
    err => {
      if (err) throw err;
      res.send("Don ajouté");
    }
  );
};
