const db = require("./db_connect");

exports.getAllBesoins = (req, res) => {
  db.query(`
    SELECT b.*, v.nom AS ville
    FROM besoin b
    JOIN ville v ON b.id_ville = v.id_ville
  `, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

exports.addBesoin = (req, res) => {
  const { type, quantite, prix_unitaire, id_ville } = req.body;

  db.query(
    "INSERT INTO besoin(type, quantite, prix_unitaire, id_ville) VALUES (?, ?, ?, ?)",
    [type, quantite, prix_unitaire, id_ville],
    (err) => {
      if (err) throw err;
      res.send("Besoin ajouté");
    }
  );
};
