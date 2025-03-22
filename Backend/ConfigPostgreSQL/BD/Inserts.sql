INSERT INTO roles (nombre_rol, descripcion_rol) VALUES 
('Customer', 'User who makes purchases on the platform'),
('AreaManager', 'Person responsible for the company’s area'),
('Administrator', 'Person in charge of managing the platform and users');


INSERT INTO usuario (correo, contraseña, id_rol) VALUES
('cliente1@email.com', '12345678', 1),
('cliente2@email.com', '12345678', 1),
('jefecorte@email.com', '12345678', 2),
('jefeembalaje@email.com', '12345678', 2),
('admin@email.com', '12345678', 3);

INSERT INTO perfil (nombre, apellido_pat, apellido_mat, telefono, direccion, id_usuario) VALUES
('Juan', 'Pérez', 'López', '5551234567', 'Street Blv1, BC', 1),
('Angel', 'Selena', 'Gomez', '5551234567', 'Street Blv1, BC', 2),
('María', 'Gómez', 'Hernández', '5557654321', 'Street Blv1, BC', 3),
('Carlos', 'Ramírez', 'Torres', '5559876543', 'Street Blv1, BC', 4),
('Ana', 'Fernández', 'Díaz', '5556789012', 'Street Blv1, BC', 5);

INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES 
('Short Sleeve T-Shirt', 'A casual t-shirt with short sleeves, perfect for warm weather.'),
('Long Sleeve T-Shirt', 'A comfortable t-shirt with long sleeves, ideal for cooler temperatures.'),
('Hoodie', 'A warm sweatshirt with a hood, great for casual wear and cold weather.'),
('Sweater', 'A knitted garment designed to keep you warm, typically worn in cold seasons.');

INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, id_categoria) VALUES 
('Sport Performance T-Shirt', 'A moisture-wicking short sleeve t-shirt for sports activities.', 489.00, 1),
('Basic T-Shirt', 'A classic short sleeve t-shirt, made from 100% cotton.', 399.00, 1),
('Striped T-Shirt', 'A casual striped short sleeve t-shirt, perfect for everyday wear.', 429.00, 1),
('V-Neck T-Shirt', 'A comfortable short sleeve v-neck t-shirt, ideal for layering.', 419.00, 1),
('Basic T-Shirt, V-Neck ', 'A classic short sleeve t-shirt, made from 100% cotton.', 549.00, 1),

('Oversized Long Sleeve', 'A relaxed fit long sleeve t-shirt for ultimate comfort.', 679.00, 2),
('Basic Blue Long Sleeve', 'A simple blue long sleeve t-shirt, perfect for casual wear.', 459.00, 2),
('Thermal Long Sleeve', 'A warm thermal long sleeve t-shirt, great for cold weather.', 549.00, 2),
('Henley Long Sleeve', 'A stylish long sleeve t-shirt with a buttoned collar.', 629.00, 2),
('Slim Fit Long Sleeve', 'A snug-fitting long sleeve t-shirt for a modern look.', 499.00, 2),

('Classic Pullover Hoodie', 'A comfortable pullover hoodie with a kangaroo pocket.', 799.00, 3),
('Zipper Hoodie', 'A zip-up hoodie with a soft fleece lining for extra warmth.', 899.00, 3),
('Graphic Hoodie', 'A stylish hoodie featuring a bold printed design.', 849.00, 3),
('Sport Performance Hoodie', 'A lightweight hoodie designed for athletic performance.', 849.00, 3),
('Fleece-Lined Hoodie', 'An ultra-warm hoodie with a fleece interior for cold days.', 899.00, 3),

('Cable Knit Sweater', 'A classic cable knit sweater made from soft wool.', 999.00, 4),
('Turtleneck Sweater', 'A cozy turtleneck sweater, ideal for winter.', 1049.00, 4),
('Crewneck Sweater', 'A simple yet elegant crewneck sweater for all occasions.', 1049.00, 4),
('V-Neck Sweater', 'A stylish V-neck sweater, perfect for layering.', 1179.00, 4),
('Cashmere Sweater', 'A luxurious cashmere sweater offering exceptional softness.', 1499.00, 4);

INSERT INTO imagen (nombre_imagen, id_producto) VALUES 
('imagenes/Producto1.png', 1), ('imagenes/Producto11.png', 1), ('imagenes/Producto12.png', 1), ('imagenes/Producto13.png', 1), 
('imagenes/Producto2.png', 2), ('imagenes/Producto21.png', 2), ('imagenes/Producto22.png', 2), ('imagenes/Producto23.png', 2), ('imagenes/Producto24.png', 2),
('imagenes/Producto3.png', 3), ('imagenes/Producto31.png', 3), ('imagenes/Producto32.png', 3), ('imagenes/Producto33.png', 3), ('imagenes/Producto34.png', 3),
('imagenes/Producto4.png', 4), ('imagenes/Producto41.png', 4), ('imagenes/Producto42.png', 4), ('imagenes/Producto43.png', 4), 
('imagenes/Producto5.png', 5), ('imagenes/Producto51.png', 5), ('imagenes/Producto52.png', 5), 
('imagenes/Producto6.png', 6), ('imagenes/Producto61.png', 6), ('imagenes/Producto62.png', 6), ('imagenes/Producto63.png', 6), 
('imagenes/Producto7.png', 7), ('imagenes/Producto71.png', 7), ('imagenes/Producto72.png', 7), ('imagenes/Producto73.png', 7), ('imagenes/Producto74.png', 7),
('imagenes/Producto8.png', 8), ('imagenes/Producto81.png', 8), ('imagenes/Producto82.png', 8), ('imagenes/Producto83.png', 8), ('imagenes/Producto84.png', 8),
('imagenes/Producto9.png', 9), ('imagenes/Producto91.png', 9), ('imagenes/Producto92.png', 9), ('imagenes/Producto93.png', 9), 
('imagenes/Producto10.png', 10), ('imagenes/Producto101.png', 10), ('imagenes/Producto102.png', 10), ('imagenes/Producto103.png', 10),
('imagenes/Producto_11.png', 11), ('imagenes/Producto_111.png', 11), ('imagenes/Producto_112.png', 11),
('imagenes/Producto_12.png', 12), ('imagenes/Producto_121.png', 12), ('imagenes/Producto_122.png', 12), 
('imagenes/Producto_13.png', 13), ('imagenes/Producto_131.png', 13), ('imagenes/Producto_132.png', 13), ('imagenes/Producto_133.png', 13), ('imagenes/Producto_134.png', 13),
('imagenes/Producto_14.png', 14), ('imagenes/Producto_141.png', 14), ('imagenes/Producto_142.png', 14), ('imagenes/Producto_143.png', 14), ('imagenes/Producto_144.png', 14), ('imagenes/Producto_145.png', 14),
('imagenes/Producto_15.png', 15), ('imagenes/Producto_151.png', 15), ('imagenes/Producto_152.png', 15), ('imagenes/Producto_153.png', 15), ('imagenes/Producto_154.png', 15),
('imagenes/Producto_16.png', 16), ('imagenes/Producto_161.png', 16), ('imagenes/Producto_162.png', 16), ('imagenes/Producto_163.png', 16), 
('imagenes/Producto_17.png', 17), ('imagenes/Producto_171.png', 17), ('imagenes/Producto_172.png', 17), ('imagenes/Producto_173.png', 17), ('imagenes/Producto_174.png', 17),
('imagenes/Producto_18.png', 18), ('imagenes/Producto_181.png', 18), ('imagenes/Producto_182.png', 18), ('imagenes/Producto_183.png', 18), ('imagenes/Producto_184.png', 18),
('imagenes/Producto_19.png', 19), ('imagenes/Producto_191.png', 19), ('imagenes/Producto_192.png', 19), 
('imagenes/Producto_20.png', 20), ('imagenes/Producto_201.png', 20), ('imagenes/Producto_202.png', 20), ('imagenes/Producto_203.png', 20), ('imagenes/Producto_204.png', 20);

INSERT INTO colores (nombre_color) VALUES 
('Black'),
('White'),
('Blue'),
('Brown'),
('Green'),
('Yellow'),
('Light Brown'),
('Red');

INSERT INTO talla (nombre_talla, cantidad, id_producto) VALUES 
('S', 1500, 1), ('M', 1500, 1), ('L', 1500, 1), ('XL', 1500, 1),
('S', 1500, 2), ('M', 1500, 2), ('L', 1500, 2), ('XL', 1500, 2),
('S', 1500, 3), ('M', 1500, 3), ('L', 1500, 3), ('XL', 1500, 3),
('S', 1500, 4), ('M', 1500, 4), ('L', 1500, 4), ('XL', 1500, 4),
('S', 1500, 5), ('M', 1500, 5), ('L', 1500, 5), ('XL', 1500, 5),

('S', 1500, 6), ('M', 1500, 6), ('L', 1500, 6), ('XL', 1500, 6),
('S', 1500, 7), ('M', 1500, 7), ('L', 1500, 7), ('XL', 1500, 7),
('S', 1500, 8), ('M', 1500, 8), ('L', 1500, 8), ('XL', 1500, 8),
('S', 1500, 9), ('M', 1500, 9), ('L', 1500, 9), ('XL', 1500, 9),
('S', 1500, 10), ('M', 1500, 10), ('L', 1500, 10), ('XL', 1500, 10),

('S', 1500, 11), ('M', 1500, 11), ('L', 1500, 11), ('XL', 1500, 11),
('S', 1500, 12), ('M', 1500, 12), ('L', 1500, 12), ('XL', 1500, 12),
('S', 1500, 13), ('M', 1500, 13), ('L', 1500, 13), ('XL', 1500, 13),
('S', 1500, 14), ('M', 1500, 14), ('L', 1500, 14), ('XL', 1500, 14),
('S', 1500, 15), ('M', 1500, 15), ('L', 1500, 15), ('XL', 1500, 15),

('S', 1500, 16), ('M', 1500, 16), ('L', 1500, 16), ('XL', 1500, 16),
('S', 1500, 17), ('M', 1500, 17), ('L', 1500, 17), ('XL', 1500, 17),
('S', 1500, 18), ('M', 1500, 18), ('L', 1500, 18), ('XL', 1500, 18),
('S', 1500, 19), ('M', 1500, 19), ('L', 1500, 19), ('XL', 1500, 19),
('S', 1500, 20), ('M', 1500, 20), ('L', 1500, 20), ('XL', 1500, 20);


INSERT INTO colores_talla (id_color, id_talla) VALUES 
-- Producto 1 (Negro, Blanco, Azul)
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4),

-- Producto 2 (Negro, Blanco, Rojo)
(1, 5), (1, 6), (1, 7), (1, 8),
(2, 5), (2, 6), (2, 7), (2, 8),
(8, 5), (8, 6), (8, 7), (8, 8),

-- Producto 3 (Negro, Blanco, Amarillo)
(1, 9), (1, 10), (1, 11), (1, 12),
(2, 9), (2, 10), (2, 11), (2, 12),
(6, 9), (6, 10), (6, 11), (6, 12),

-- Producto 4 (Azul, Rojo, Verde)
(3, 13), (3, 14), (3, 15), (3, 16),
(8, 13), (8, 14), (8, 15), (8, 16),
(5, 13), (5, 14), (5, 15), (5, 16),

-- Producto 5 (Café claro, Café, Negro)
(7, 17), (7, 18), (7, 19), (7, 20),
(4, 17), (4, 18), (4, 19), (4, 20),
(1, 17), (1, 18), (1, 19), (1, 20),

-- Producto 6 (Blanco, Azul)
(2, 21), (2, 22), (2, 23), (2, 24),
(3, 21), (3, 22), (3, 23), (3, 24),

-- Producto 7 (Azul, Blanco, Amarillo)
(3, 25), (3, 26), (3, 27), (3, 28),
(2, 25), (2, 26), (2, 27), (2, 28),
(6, 25), (6, 26), (6, 27), (6, 28),

-- Producto 8 (Negro, Azul)
(1, 29), (1, 30), (1, 31), (1, 32),
(3, 29), (3, 30), (3, 31), (3, 32),

-- Producto 9 (Negro, Rojo, Amarillo)
(1, 33), (1, 34), (1, 35), (1, 36),
(8, 33), (8, 34), (8, 35), (8, 36),
(6, 33), (6, 34), (6, 35), (6, 36),

-- Producto 10 (Negro, Blanco, Azul)
(1, 37), (1, 38), (1, 39), (1, 40),
(2, 37), (2, 38), (2, 39), (2, 40),
(3, 37), (3, 38), (3, 39), (3, 40),

-- Producto 11 (Blanco, Rojo, Verde)
(2, 41), (2, 42), (2, 43), (2, 44),
(8, 41), (8, 42), (8, 43), (8, 44),
(5, 41), (5, 42), (5, 43), (5, 44),

-- Producto 12 (Verde, Café claro, Negro)
(5, 45), (5, 46), (5, 47), (5, 48),
(7, 45), (7, 46), (7, 47), (7, 48),
(1, 45), (1, 46), (1, 47), (1, 48),

-- Producto 13 (Negro, Amarillo)
(1, 49), (1, 50), (1, 51), (1, 52),
(6, 49), (6, 50), (6, 51), (6, 52),

-- Producto 14 (Amarillo, Café, Azul)
(6, 53), (6, 54), (6, 55), (6, 56),
(4, 53), (4, 54), (4, 55), (4, 56),
(3, 53), (3, 54), (3, 55), (3, 56),

-- Producto 15 (Verde, Amarillo, Blanco)
(5, 57), (5, 58), (5, 59), (5, 60),
(6, 57), (6, 58), (6, 59), (6, 60),
(2, 57), (2, 58), (2, 59), (2, 60),

-- Producto 16 (Café claro, Rojo, Verde)
(7, 61), (7, 62), (7, 63), (7, 64),
(8, 61), (8, 62), (8, 63), (8, 64),
(5, 61), (5, 62), (5, 63), (5, 64),

-- Producto 17 (Negro, Rojo, Blanco)
(1, 65), (1, 66), (1, 67), (1, 68),
(8, 65), (8, 66), (8, 67), (8, 68),
(2, 65), (2, 66), (2, 67), (2, 68),

-- Producto 18 (Rojo, Blanco)
(8, 69), (8, 70), (8, 71), (8, 72),
(2, 69), (2, 70), (2, 71), (2, 72),

-- Producto 19 (Rojo, Café, Amarillo)
(8, 73), (8, 74), (8, 75), (8, 76),
(4, 73), (4, 74), (4, 75), (4, 76),
(6, 73), (6, 74), (6, 75), (6, 76),

-- Producto 20 (Azul, Rojo, Café)
(3, 77), (3, 78), (3, 79), (3, 80),
(8, 77), (8, 78), (8, 79), (8, 80),
(4, 77), (4, 78), (4, 79), (4, 80);


INSERT INTO stock (cantidad_actual, cantidad_eliminada, cantidad_agregada, id_talla) VALUES
(1500, 0, 0, 1),
(1500, 0, 0, 2),
(1500, 0, 0, 3),
(1500, 0, 0, 4),
(1500, 0, 0, 5),
(1500, 0, 0, 6),
(1500, 0, 0, 7),
(1500, 0, 0, 8),
(1500, 0, 0, 9),
(1500, 0, 0, 10),
(1500, 0, 0, 11),
(1500, 0, 0, 12),
(1500, 0, 0, 13),
(1500, 0, 0, 14),
(1500, 0, 0, 15),
(1500, 0, 0, 16),
(1500, 0, 0, 17),
(1500, 0, 0, 18),
(1500, 0, 0, 19),
(1500, 0, 0, 20),
(1500, 0, 0, 21),
(1500, 0, 0, 22),
(1500, 0, 0, 23),
(1500, 0, 0, 24),
(1500, 0, 0, 25),
(1500, 0, 0, 26),
(1500, 0, 0, 27),
(1500, 0, 0, 28),
(1500, 0, 0, 29),
(1500, 0, 0, 30),
(1500, 0, 0, 31),
(1500, 0, 0, 32),
(1500, 0, 0, 33),
(1500, 0, 0, 34),
(1500, 0, 0, 35),
(1500, 0, 0, 36),
(1500, 0, 0, 37),
(1500, 0, 0, 38),
(1500, 0, 0, 39),
(1500, 0, 0, 40),
(1500, 0, 0, 41),
(1500, 0, 0, 42),
(1500, 0, 0, 43),
(1500, 0, 0, 44),
(1500, 0, 0, 45),
(1500, 0, 0, 46),
(1500, 0, 0, 47),
(1500, 0, 0, 48),
(1500, 0, 0, 49),
(1500, 0, 0, 50),
(1500, 0, 0, 51),
(1500, 0, 0, 52),
(1500, 0, 0, 53),
(1500, 0, 0, 54),
(1500, 0, 0, 55),
(1500, 0, 0, 56),
(1500, 0, 0, 57),
(1500, 0, 0, 58),
(1500, 0, 0, 59),
(1500, 0, 0, 60),
(1500, 0, 0, 61),
(1500, 0, 0, 62),
(1500, 0, 0, 63),
(1500, 0, 0, 64),
(1500, 0, 0, 65),
(1500, 0, 0, 66),
(1500, 0, 0, 67),
(1500, 0, 0, 68),
(1500, 0, 0, 69),
(1500, 0, 0, 70),
(1500, 0, 0, 71),
(1500, 0, 0, 72),
(1500, 0, 0, 73),
(1500, 0, 0, 74),
(1500, 0, 0, 75),
(1500, 0, 0, 76),
(1500, 0, 0, 77),
(1500, 0, 0, 78),
(1500, 0, 0, 79),
(1500, 0, 0, 80);


INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla) VALUES 
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 1),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 2),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 3),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 4),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 5),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 6),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 7),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 8),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 9),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 10),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 11),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 12),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 13),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 14),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 15),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 16),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 17),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 18),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 19),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 20),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 21),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 22),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 23),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 24),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 25),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 26),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 27),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 28),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 29),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 30),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 31),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 32),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 33),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 34),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 35),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 36),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 37),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 38),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 39),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 40),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 41),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 42),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 43),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 44),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 45),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 46),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 47),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 48),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 49),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 50),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 51),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 52),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 53),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 54),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 55),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 56),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 57),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 58),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 59),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 60),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 61),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 62),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 63),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 64),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 65),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 66),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 67),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 68),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 69),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 70),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 71),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 72),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 73),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 74),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 75),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 76),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 77),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 78),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 79),
(1500, 'New product added', CURRENT_DATE, CURRENT_TIME, 80);


INSERT INTO solicitud (fecha_registro, hora_registro, fecha_entrega_estimada, estado_solicitud, id_usuario) VALUES 
(CURRENT_DATE, CURRENT_TIME, CURRENT_DATE + INTERVAL '5 days', 'IN REVIEW', 1),
(CURRENT_DATE, CURRENT_TIME, CURRENT_DATE + INTERVAL '7 days', 'IN REVIEW', 1),
(CURRENT_DATE, CURRENT_TIME, CURRENT_DATE + INTERVAL '5 days', 'IN REVIEW', 2);

INSERT INTO solicitud_producto (cantidad_total, id_talla, id_solicitud) VALUES 
(2, 1, 1),
(3, 2, 2),
(1, 5, 3);

INSERT INTO area (nombre_area, id_usuario) VALUES 
('Cut', 3),
('Packaging', 4);

INSERT INTO trabajo (id_area, descripcion_trabajo) VALUES 
(1, 'Cutting fabric for production'),
(2, 'Packaging and labeling of products');

INSERT INTO pedido (estado_pedido, cantidad_total, id_solicitud_producto, id_area) VALUES 
('PENDING', 2, 1, 1),
('PENDING', 3, 2, 1),
('PENDING', 1, 3, 1);

INSERT INTO historial_pedido (estado_seguimiento, fecha, hora, id_pedido) VALUES 
('PENDING', CURRENT_DATE, CURRENT_TIME, 1),
('PENDING', CURRENT_DATE, CURRENT_TIME, 2),
('PENDING', CURRENT_DATE, CURRENT_TIME, 3);
