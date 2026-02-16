const db = require("./db_connect");

exports.dispatch = (req, res) => {

  db.query("SELECT * FROM don ORDER BY date_don", (err, dons) => {

    dons.forEach(don => {
      let resteDon = don.quantite;

      db.query(`
        SELECT b.id_besoin, b.quantite - IFNULL(SUM(a.quantite_attribuee),0) AS reste
        FROM besoin b
        LEFT JOIN attribution a ON b.id_besoin = a.id_besoin
        WHERE b.type = ?
        GROUP BY b.id_besoin
        HAVING reste > 0
      `, [don.type], (err, besoins) => {

        besoins.forEach(b => {
          if (resteDon <= 0) return;

          const q = Math.min(resteDon, b.reste);

          db.query(
            "INSERT INTO attribution(id_don, id_besoin, quantite_attribuee) VALUES (?, ?, ?)",
            [don.id_don, b.id_besoin, q]
          );

          resteDon -= q;
        });

      });

    });

  });

  res.send("Dispatch terminé");
};
