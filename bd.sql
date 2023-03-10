CREATE TABLE equipos (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    modelos VARCHAR(45),
    precio DECIMAL(15),
    caracteristicas VARCHAR(80),
    marca_id INT NOT NULL,
    categoria_id INT NOT NULL,
    stock INT(5)
);

CREATE TABLE marca (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45)
);

CREATE TABLE categoria (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    categoria VARCHAR(45)
);


CREATE TABLE equipos_facturas (
	equipos_id INT NOT NULL,
    facturas_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_producto DECIMAL(15)
);

CREATE TABLE facturas (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fecha_venta DATETIME(6),
    total_factura DECIMAL(15),
    usuarios_id INT NOT NULL 
);

CREATE TABLE usuarios (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    usuario VARCHAR(45),
    email VARCHAR(45),
    pass VARCHAR(50),
    imagen VARCHAR(45),
    roles_id INT NOT NULL
);

CREATE TABLE roles (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    jerarquia VARCHAR(45)
);


CREATE TABLE equipos (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    modelos VARCHAR(255),
    precio DECIMAL(15),
    caracteristicas VARCHAR(255),
    marca_id INT NOT NULL,
    CONSTRAINT seasons_marca_id_foreign FOREIGN KEY (marca_id) REFERENCES marca (id),
    categoria_id INT NOT NULL,
	CONSTRAINT seasons_categoria_id_foreign FOREIGN KEY (categoria_id) REFERENCES categoria (id),
    stock INT(5)
);

CREATE TABLE marca (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255)
);

CREATE TABLE categoria (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    categoria VARCHAR(255)
);


CREATE TABLE equipos_facturas (
	equipos_id INT NOT NULL,
    CONSTRAINT seasons_equipos_id_foreign FOREIGN KEY (equipos_id) REFERENCES equipos (id),
    facturas_id INT NOT NULL,
    CONSTRAINT seasons_facturas_id_foreign FOREIGN KEY (facturas_id) REFERENCES facturas (id),
    cantidad INT NOT NULL,
    precio_producto DECIMAL(15)
);

CREATE TABLE facturas (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fecha_venta DATETIME(6),
    total_factura DECIMAL(15),
    usuarios_id INT NOT NULL,
    CONSTRAINT seasons_usuarios_id_foreign FOREIGN KEY (usuarios_id) REFERENCES usuarios (id)
);

CREATE TABLE usuarios (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    usuario VARCHAR(255),
    email VARCHAR(255),
    pass VARCHAR(255),
    imagen VARCHAR(255),
    roles_id INT NOT NULL,
    CONSTRAINT seasons_roles_id_foreign FOREIGN KEY (roles_id) REFERENCES roles (id)
);

CREATE TABLE roles (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    jerarquia VARCHAR(255)
);