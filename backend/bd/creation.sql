CREATE DATABASE IF NOT EXISTS campus_smart_manager;
USE campus_smart_manager;

-- 1. Table des Bâtiments
CREATE TABLE buildings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255)
);

-- 2. Table des Salles
CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT,
    room_number VARCHAR(20) NOT NULL,
    capacity INT,
    room_type ENUM('amphi', 'salle_td', 'tp', 'bureau'),
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);

-- 3. Table des Utilisateurs
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('student', 'staff', 'admin') DEFAULT 'student'
);

-- 4. Table des Réservations
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    user_id INT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX (start_time, end_time)
);

-- 5. Table des Incidents
CREATE TABLE incidents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    reported_by INT,
    description TEXT,
    severity ENUM('low', 'medium', 'high', 'critical'),
    status ENUM('open', 'in_progress', 'resolved') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (reported_by) REFERENCES users(id)
);

-- 6. Table des Capteurs
CREATE TABLE sensors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    sensor_type ENUM('occupancy', 'temperature', 'energy'),
    unit VARCHAR(10), 
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- 7. Table des Données (Séries temporelles)
CREATE TABLE sensor_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sensor_id INT,
    value FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensors(id),
    INDEX (timestamp)
);