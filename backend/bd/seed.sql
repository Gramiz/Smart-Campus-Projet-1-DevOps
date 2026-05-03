-- Smart Campus — Seed pour le dashboard "Smart Campus — Analytics"
--
-- Génère un jeu de données réaliste (3 bâtiments, 10 salles, 15 utilisateurs,
-- 30 capteurs, ~21 600 mesures, ~85 réservations, ~14 incidents) sur les 30
-- derniers jours, avec des anomalies et des "ghost rooms" injectées exprès
-- pour que tous les panels du dashboard montrent quelque chose.
--
-- Import :
--   - phpMyAdmin : sélectionner la base `campus_smart_manager` → Importer → choisir ce fichier
--   - CLI :        docker exec -i smart_campus_db mariadb -u campus_user -pcampus_password campus_smart_manager < backend/bd/seed.sql
--
-- Le fichier est idempotent — il vide les tables avant d'insérer.

USE campus_smart_manager;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM sensor_data;
DELETE FROM sensors;
DELETE FROM bookings;
DELETE FROM incidents;
DELETE FROM rooms;
DELETE FROM users;
DELETE FROM buildings;

ALTER TABLE sensor_data AUTO_INCREMENT = 1;
ALTER TABLE sensors      AUTO_INCREMENT = 1;
ALTER TABLE bookings     AUTO_INCREMENT = 1;
ALTER TABLE incidents    AUTO_INCREMENT = 1;
ALTER TABLE rooms        AUTO_INCREMENT = 1;
ALTER TABLE users        AUTO_INCREMENT = 1;
ALTER TABLE buildings    AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. Bâtiments
-- ----------------------------------------------------------------------------
INSERT INTO buildings (id, name, location) VALUES
  (1, 'Batiment Sciences', 'Campus Mariani'),
  (2, 'Batiment Lettres',  'Campus Mariani'),
  (3, 'Batiment IUT',      'Campus Grossetti');

-- ----------------------------------------------------------------------------
-- 2. Salles
-- ----------------------------------------------------------------------------
INSERT INTO rooms (id, building_id, room_number, capacity, room_type) VALUES
  (1,  1, 'A101', 120, 'amphi'),
  (2,  1, 'A102',  30, 'salle_td'),
  (3,  1, 'A103',  24, 'tp'),
  (4,  1, 'A104',   8, 'bureau'),
  (5,  2, 'B201',  80, 'amphi'),
  (6,  2, 'B202',  30, 'salle_td'),
  (7,  2, 'B203',  30, 'salle_td'),
  (8,  3, 'C301',  24, 'tp'),
  (9,  3, 'C302',  24, 'tp'),
  (10, 3, 'C303',  30, 'salle_td');

-- ----------------------------------------------------------------------------
-- 3. Utilisateurs (1 admin, 4 staff, 10 students)
-- ----------------------------------------------------------------------------
INSERT INTO users (id, first_name, last_name, email, password, role) VALUES
  (1,  'Admin',  'Systeme',  'admin@univ-corse.fr',               '$2b$12$placeholder', 'admin'),
  (2,  'Marie',  'Dubois',   'marie.dubois@univ-corse.fr',        '$2b$12$placeholder', 'staff'),
  (3,  'Jean',   'Martin',   'jean.martin@univ-corse.fr',         '$2b$12$placeholder', 'staff'),
  (4,  'Pierre', 'Durand',   'pierre.durand@univ-corse.fr',       '$2b$12$placeholder', 'staff'),
  (5,  'Sophie', 'Leroy',    'sophie.leroy@univ-corse.fr',        '$2b$12$placeholder', 'staff'),
  (6,  'Lucas',  'Bernard',  'lucas.bernard@etu.univ-corse.fr',   '$2b$12$placeholder', 'student'),
  (7,  'Emma',   'Petit',    'emma.petit@etu.univ-corse.fr',      '$2b$12$placeholder', 'student'),
  (8,  'Hugo',   'Robert',   'hugo.robert@etu.univ-corse.fr',     '$2b$12$placeholder', 'student'),
  (9,  'Lea',    'Richard',  'lea.richard@etu.univ-corse.fr',     '$2b$12$placeholder', 'student'),
  (10, 'Nathan', 'Moreau',   'nathan.moreau@etu.univ-corse.fr',   '$2b$12$placeholder', 'student'),
  (11, 'Chloe',  'Simon',    'chloe.simon@etu.univ-corse.fr',     '$2b$12$placeholder', 'student'),
  (12, 'Tom',    'Laurent',  'tom.laurent@etu.univ-corse.fr',     '$2b$12$placeholder', 'student'),
  (13, 'Manon',  'Lefevre',  'manon.lefevre@etu.univ-corse.fr',   '$2b$12$placeholder', 'student'),
  (14, 'Paul',   'Garcia',   'paul.garcia@etu.univ-corse.fr',     '$2b$12$placeholder', 'student'),
  (15, 'Ines',   'David',    'ines.david@etu.univ-corse.fr',      '$2b$12$placeholder', 'student');

-- ----------------------------------------------------------------------------
-- 4. Capteurs (3 par salle : occupancy, temperature, energy)
-- ----------------------------------------------------------------------------
INSERT INTO sensors (id, room_id, sensor_type, unit) VALUES
  (1,  1,  'occupancy', 'ratio'), (2,  1,  'temperature', 'C'), (3,  1,  'energy', 'kWh'),
  (4,  2,  'occupancy', 'ratio'), (5,  2,  'temperature', 'C'), (6,  2,  'energy', 'kWh'),
  (7,  3,  'occupancy', 'ratio'), (8,  3,  'temperature', 'C'), (9,  3,  'energy', 'kWh'),
  (10, 4,  'occupancy', 'ratio'), (11, 4,  'temperature', 'C'), (12, 4,  'energy', 'kWh'),
  (13, 5,  'occupancy', 'ratio'), (14, 5,  'temperature', 'C'), (15, 5,  'energy', 'kWh'),
  (16, 6,  'occupancy', 'ratio'), (17, 6,  'temperature', 'C'), (18, 6,  'energy', 'kWh'),
  (19, 7,  'occupancy', 'ratio'), (20, 7,  'temperature', 'C'), (21, 7,  'energy', 'kWh'),
  (22, 8,  'occupancy', 'ratio'), (23, 8,  'temperature', 'C'), (24, 8,  'energy', 'kWh'),
  (25, 9,  'occupancy', 'ratio'), (26, 9,  'temperature', 'C'), (27, 9,  'energy', 'kWh'),
  (28, 10, 'occupancy', 'ratio'), (29, 10, 'temperature', 'C'), (30, 10, 'energy', 'kWh');

-- ----------------------------------------------------------------------------
-- 5. sensor_data : 30 jours x 24h x 30 capteurs = 21 600 lignes
--    On utilise le moteur Sequence de MariaDB (seq_0_to_719 = 720 heures).
--    Patrons réalistes :
--      - occupancy : ~0.80 en semaine 8h-18h, ~0.05 sinon, ~0.10 le week-end
--      - temperature : ~20.5 C avec cycle diurne sin
--      - energy : 0.4 baseline + 3.5 * occupancy
-- ----------------------------------------------------------------------------
INSERT INTO sensor_data (sensor_id, value, timestamp)
SELECT
  s.id AS sensor_id,
  CASE s.sensor_type
    WHEN 'occupancy' THEN
      ROUND(GREATEST(0, LEAST(1,
        (CASE
          WHEN DAYOFWEEK(DATE_SUB(NOW(), INTERVAL (720 - sq.seq) HOUR)) IN (1, 7) THEN 0.10
          WHEN HOUR(DATE_SUB(NOW(), INTERVAL (720 - sq.seq) HOUR)) BETWEEN 8 AND 18 THEN 0.80
          ELSE 0.05
        END) + (RAND() - 0.5) * 0.15
      )), 3)
    WHEN 'temperature' THEN
      ROUND(
        20.5
        + 1.5 * SIN((HOUR(DATE_SUB(NOW(), INTERVAL (720 - sq.seq) HOUR)) - 6) / 24.0 * 2 * PI())
        + (RAND() - 0.5) * 0.8,
      2)
    WHEN 'energy' THEN
      ROUND(
        0.4
        + 3.5 * (CASE
            WHEN DAYOFWEEK(DATE_SUB(NOW(), INTERVAL (720 - sq.seq) HOUR)) IN (1, 7) THEN 0.10
            WHEN HOUR(DATE_SUB(NOW(), INTERVAL (720 - sq.seq) HOUR)) BETWEEN 8 AND 18 THEN 0.80
            ELSE 0.05
          END)
        + (RAND() - 0.5) * 0.4,
      3)
  END AS value,
  DATE_SUB(NOW(), INTERVAL (720 - sq.seq) HOUR) AS timestamp
FROM seq_0_to_719 AS sq
CROSS JOIN sensors AS s;

-- ----------------------------------------------------------------------------
-- 6. Anomalies — outliers extrêmes (|z-score| >> 3)
--    Pic et chute de température, surconsommation énergétique
-- ----------------------------------------------------------------------------
INSERT INTO sensor_data (sensor_id, value, timestamp) VALUES
  (2,  38.5, NOW() - INTERVAL 2  DAY),
  (2,  41.2, NOW() - INTERVAL 1  DAY - INTERVAL 6 HOUR),
  (8,   3.5, NOW() - INTERVAL 5  DAY),
  (11, 45.0, NOW() - INTERVAL 7  DAY),
  (14, 39.8, NOW() - INTERVAL 10 DAY),
  (17,  4.0, NOW() - INTERVAL 3  DAY - INTERVAL 12 HOUR),
  (20, 42.5, NOW() - INTERVAL 6  DAY),
  (23, 38.0, NOW() - INTERVAL 4  DAY),
  (3,  18.0, NOW() - INTERVAL 1  DAY),
  (15, 16.5, NOW() - INTERVAL 8  DAY);

-- ----------------------------------------------------------------------------
-- 7. Réservations "normales" — semaine 8h/10h/12h/14h, 90 min, sur 30 jours
--    seq_0_to_119 = 30 jours x 4 créneaux/jour, filtré sur jours ouvrables.
-- ----------------------------------------------------------------------------
INSERT INTO bookings (room_id, user_id, start_time, end_time, status)
SELECT
  ((sq.seq * 7) % 10) + 1 AS room_id,
  ((sq.seq * 3) % 14) + 2 AS user_id,
  TIMESTAMP(
    DATE_SUB(CURDATE(), INTERVAL (sq.seq DIV 4) DAY),
    MAKETIME(8 + (sq.seq MOD 4) * 2, 0, 0)
  ) AS start_time,
  TIMESTAMP(
    DATE_SUB(CURDATE(), INTERVAL (sq.seq DIV 4) DAY),
    MAKETIME(8 + (sq.seq MOD 4) * 2, 0, 0)
  ) + INTERVAL 90 MINUTE AS end_time,
  CASE WHEN sq.seq MOD 13 = 0 THEN 'cancelled' ELSE 'confirmed' END AS status
FROM seq_0_to_119 AS sq
WHERE DAYOFWEEK(DATE_SUB(CURDATE(), INTERVAL (sq.seq DIV 4) DAY)) NOT IN (1, 7);

-- ----------------------------------------------------------------------------
-- 8. Ghost bookings — réservations en pleine nuit (22h-23h30)
--    L'occupation capteur à ces heures ~ 0.05, donc avg < 0.20 → ghost.
-- ----------------------------------------------------------------------------
INSERT INTO bookings (room_id, user_id, start_time, end_time, status)
SELECT
  ((sq.seq * 11) % 10) + 1,
  ((sq.seq * 5)  % 14) + 2,
  TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL sq.seq DAY), '22:00:00'),
  TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL sq.seq DAY), '23:30:00'),
  'confirmed'
FROM seq_0_to_29 AS sq
WHERE DAYOFWEEK(DATE_SUB(CURDATE(), INTERVAL sq.seq DAY)) NOT IN (1, 7)
  AND sq.seq MOD 3 = 0;

-- ----------------------------------------------------------------------------
-- 9. Incidents — concentration sur salles 3 et 7 pour faire ressortir le panel
--    "salles les plus problématiques"
-- ----------------------------------------------------------------------------
INSERT INTO incidents (room_id, reported_by, description, severity, status, created_at) VALUES
  (3,  2, 'Videoprojecteur HS',           'high',     'open',         NOW() - INTERVAL 5  DAY),
  (3,  5, 'Climatisation bruyante',       'medium',   'in_progress',  NOW() - INTERVAL 4  DAY),
  (3,  7, 'Tableau casse',                'high',     'resolved',     NOW() - INTERVAL 12 DAY),
  (3,  2, 'Fuite plafond',                'critical', 'in_progress',  NOW() - INTERVAL 2  DAY),
  (3,  3, 'Plafond fissure',              'critical', 'open',         NOW() - INTERVAL 1  DAY),
  (7,  2, 'Prise electrique defectueuse', 'critical', 'resolved',     NOW() - INTERVAL 8  DAY),
  (7,  4, 'Porte qui ne ferme pas',       'high',     'open',         NOW() - INTERVAL 3  DAY),
  (7,  6, 'Vitre fissuree',               'high',     'in_progress',  NOW() - INTERVAL 6  DAY),
  (7,  4, 'Tuyau qui fuit',               'critical', 'open',         NOW() - INTERVAL 4  DAY),
  (2,  3, 'Chauffage en panne',           'high',     'resolved',     NOW() - INTERVAL 15 DAY),
  (5,  2, 'Systeme son defaillant',       'medium',   'open',         NOW() - INTERVAL 7  DAY),
  (8,  4, 'Souris ergonomiques manquantes','low',     'resolved',     NOW() - INTERVAL 10 DAY),
  (1,  5, 'Micro qui gresille',           'medium',   'in_progress',  NOW() - INTERVAL 1  DAY),
  (10, 3, 'Fenetre cassee par le vent',   'critical', 'resolved',     NOW() - INTERVAL 20 DAY);

-- ----------------------------------------------------------------------------
-- Récapitulatif (à exécuter à la main si tu veux vérifier)
-- ----------------------------------------------------------------------------
-- SELECT
--   (SELECT COUNT(*) FROM buildings)   AS buildings,
--   (SELECT COUNT(*) FROM rooms)       AS rooms,
--   (SELECT COUNT(*) FROM users)       AS users,
--   (SELECT COUNT(*) FROM sensors)     AS sensors,
--   (SELECT COUNT(*) FROM sensor_data) AS sensor_data,
--   (SELECT COUNT(*) FROM bookings)    AS bookings,
--   (SELECT COUNT(*) FROM incidents)   AS incidents;
