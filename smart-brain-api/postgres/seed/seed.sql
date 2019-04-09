BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined, pet, age) VALUES ('lll', 'lll@abv.bg', 5, '2018-01-01', 'Rocco', 26);
INSERT INTO login (hash, email) VALUES ('$2a$10$ZKMzLBY/JtnJLC.KQZvXl.97rK/hAnPmyMWg07pVj9IylhiG/wv4.', 'lll@abv.bg');

COMMIT;