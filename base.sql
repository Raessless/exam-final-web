CREATE DATABASE bngrc;
USE bngrc;

CREATE TABLE ville (
    id_ville INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE besoin (
    id_besoin INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    quantite INT,
    prix_unitaire DECIMAL(10,2),
    id_ville INT,
    FOREIGN KEY (id_ville) REFERENCES ville(id_ville)
);

CREATE TABLE don (
    id_don INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    quantite INT,
    date_don DATE
);

CREATE TABLE attribution (
    id_attr INT AUTO_INCREMENT PRIMARY KEY,
    id_don INT,
    id_besoin INT,
    quantite_attribuee INT,
    FOREIGN KEY (id_don) REFERENCES don(id_don),
    FOREIGN KEY (id_besoin) REFERENCES besoin(id_besoin)
);

INSERT INTO ville (nom) VALUES
('Antananarivo'),
('Toamasina'),
('Mahajanga'),
('Fianarantsoa'),
('Toliara'),
('Antsiranana');

INSERT INTO besoin (type, quantite, prix_unitaire, id_ville) VALUES
('riz', 500, 2000, 1),
('huile', 200, 8000, 1),
('riz', 300, 2000, 2),
('tôle', 100, 25000, 2),
('riz', 400, 2000, 3),
('clou', 1000, 100, 3);

INSERT INTO don (type, quantite, date_don) VALUES
('riz', 600, '2026-02-10'),
('huile', 150, '2026-02-11'),
('tôle', 80, '2026-02-12');


SELECT v.nom AS ville, b.type, b.quantite, b.prix_unitaire
FROM besoin b
JOIN ville v ON b.id_ville = v.id_ville;

SELECT v.nom, SUM(b.quantite * b.prix_unitaire) AS total
FROM besoin b
JOIN ville v ON b.id_ville = v.id_ville
GROUP BY v.nom;

SELECT * FROM don ORDER BY date_don;

SELECT d.type, a.quantite_attribuee, v.nom
FROM attribution a
JOIN don d ON a.id_don = d.id_don
JOIN besoin b ON a.id_besoin = b.id_besoin
JOIN ville v ON b.id_ville = v.id_ville;
