DROP DATABASE IF exists BD_tnlp;
CREATE DATABASE BD_tnlp;
USE BD_tnlp;

CREATE TABLE marca (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255),
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE categoria (
	id INT NOT NULL AUTO_INCREMENT,
    categoria VARCHAR(255),
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE equipos (
	id INT  NOT NULL AUTO_INCREMENT,
    modelo VARCHAR(255),
    precio DECIMAL(15),
    caracteristicas VARCHAR(255),
    marca_id INT NOT NULL,
    imagen BLOB,
    stock INT(5),
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (marca_id) REFERENCES marca(id),
    categoria_id INT NOT NULL,
	FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
    jerarquia VARCHAR(255),
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT, 
    usuario VARCHAR(255),
    email VARCHAR(255),
    pass VARCHAR(255),
    imagen VARCHAR(255),
    roles_id INT NOT NULL,
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);
CREATE TABLE facturas (
	id INT NOT NULL AUTO_INCREMENT,
    fecha_venta DATETIME(6),
    total_factura DECIMAL(15),
    usuarios_id INT NOT NULL,
    created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);


CREATE TABLE equipos_facturas (
	created_at VARCHAR(255),
    updated_at VARCHAR(255),
    deleted_at BOOLEAN,
	equipos_id INT NOT NULL,
    FOREIGN KEY (equipos_id) REFERENCES equipos(id),
    facturas_id INT NOT NULL,
    FOREIGN KEY (facturas_id) REFERENCES facturas(id),
    cantidad INT NOT NULL,
    precio_producto DECIMAL(15)
);



