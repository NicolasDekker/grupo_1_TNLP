CREATE TABLE equipos (
	id INT  NOT NULL AUTO_INCREMENT,
    modelos VARCHAR(255),
    precio DECIMAL(15),
    caracteristicas VARCHAR(255),
    marca_id INT NOT NULL,
    stock INT(5),
    PRIMARY KEY (id),
    FOREIGN KEY (marca_id) REFERENCES marca(id),
    categoria_id INT NOT NULL,
	FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE marca (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE categoria (
	id INT NOT NULL AUTO_INCREMENT,
    categoria VARCHAR(255),
    PRIMARY KEY (id)
);


CREATE TABLE equipos_facturas (
	equipos_id INT NOT NULL,
    FOREIGN KEY (equipos_id) REFERENCES equipos(id),
    facturas_id INT NOT NULL,
    FOREIGN KEY (facturas_id) REFERENCES facturas(id),
    cantidad INT NOT NULL,
    precio_producto DECIMAL(15)
);

CREATE TABLE facturas (
	id INT NOT NULL AUTO_INCREMENT,
    fecha_venta DATETIME(6),
    total_factura DECIMAL(15),
    usuarios_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);

CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT, 
    usuario VARCHAR(255),
    email VARCHAR(255),
    pass VARCHAR(255),
    imagen VARCHAR(255),
    roles_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
    jerarquia VARCHAR(255),
    PRIMARY KEY (id)
);


    