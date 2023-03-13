INSERT INTO categoria (id, categoria)
VALUES  (1,'ofice'),
		(2,'gamer'),
		(3,'design');

INSERT INTO marca (id,nombre)
VALUES (1,'HP'),
		(2,'Asus'),
		(3,'Dell'),
		(4,'Lenovo'),
		(5,'Acer'),
		(6,'MSI');


INSERT INTO equipos (id,marca_id,modelos,precio,caracteristicas,categoria_id,stock)
VALUES (1,1,'Victus 16-d0516la',280000,"Intel Core I5 8gb Ram 512gb Ssd Win 11",2,5),
		(2,1,'Pavilion 15-ec1035la',199999,"AMD Ryzen 5 32gb Ram Ssd 500gb Gtx 1050 3gb",2,5),
		(3,2,'Rog Strix scar gl503',889999,"Ryzen 9 32gb Ram 512gb Ssd Rx 6800m 15,6",2,4),
		(4,6,'Vector GP76 HX - 12U',739890,"Core i7 32GB RAM RTX 3070Ti 1tb Ssd 17,30",2,4);
        
        
INSERT INTO roles (id,jerarquia)
VALUES  (1,'usuario'),
		(2,'super usuario');
        
INSERT INTO usuarios (id,usuario,email,pass,roles_id)
VALUES  (1,"Jeros",'jeros_lp@hotmail.com','1234',2),
		(2,"Jor",'jorgevarios@yahoo.com.ar','1234',2),
		(3,"Nico",'dekkernicolas@gmail.com','1234',2),
        (4,"user",'user@hotmail.com','1234',1);

