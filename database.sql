CREATE DATABASE invitacionmaia;
USE invitacionmaia;

CREATE TABLE reservas(
	id int primary key AUTO_INCREMENT,
	nombre varchar(255),
    apellido varchar(255),
    restriccion longtext
);
CREATE TABLE canciones(
	id int primary key auto_increment,
    cancion varchar(255))