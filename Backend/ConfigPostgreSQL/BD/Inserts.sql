INSERT INTO roles (nombre_rol, descripcion_rol) VALUES 
('Customer', 'User who makes purchases on the platform'),
('AreaManager', 'Person responsible for the company’s area'),
('Administrator', 'Person in charge of managing the platform and users');


INSERT INTO usuario (correo, contraseña, id_rol) VALUES
('cliente1@email.com', 'clave123', 1),
('cliente9@email.com', 'clave123', 1),
('jefecorte3@email.com', 'clave123', 2),
('jefeembalaje1@email.com', 'clave123', 2),
('admin8@email.com', 'clave123', 3);

INSERT INTO perfil (nombre, apellido_pat, apellido_mat, telefono, direccion, id_usuario) VALUES
('Juan', 'Pérez', 'López', '5551234567', 'Street Blv1, BC', 1),
('Angel', 'Selena', 'Gomez', '5551234567', 'Street Blv1, BC', 2),
('María', 'Gómez', 'Hernández', '5557654321', 'Street Blv1, BC', 3),
('Carlos', 'Ramírez', 'Torres', '5559876543', 'Street Blv1, BC', 4),
('Ana', 'Fernández', 'Díaz', '5556789012', 'Street Blv1, BC', 5);

INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES 
('Men', 'Category of men’s clothing'), 
('Women', 'Category of women’s clothing');

INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, imagen, id_categoria) VALUES 
('Cotton T-shirt', '100% cotton t-shirt, comfortable and lightweight.', 299.99, 'camiseta.jpg', 1),
('Leather Jacket', 'Stylish and durable leather jacket.', 1499.99, 'leather_jacket.jpg', 1),
('Wool Sweater', 'Warm wool sweater, perfect for cold weather.', 799.99, 'wool_sweater.jpg', 1),
('Yoga Pants', 'Stretchable yoga pants for ultimate flexibility.', 649.99, 'yoga_pants.jpg', 2),
('Running Shorts', 'Breathable shorts for maximum comfort during runs.', 499.99, 'running_shorts.jpg', 2),
('Sports Sneakers', 'Lightweight sneakers for running.', 999.99, 'zapatillas.jpg', 2);

INSERT INTO colores (nombre_color) VALUES 
('Negro'),
('Blanco'),
('Azul'),
('Rojo');

INSERT INTO talla (nombre_talla, cantidad, id_producto, id_color) VALUES 
('S', 12, 1, 1),
('M', 10, 1, 1),
('L', 8, 2, 1),
('XL', 5, 2, 4),
('M', 15, 3, 1),
('L', 10, 3, 1),
('S', 20, 4, 2),
('M', 18, 4, 2),
('L', 22, 5, 2),
('XL', 16, 5, 2),
('S', 14, 6, 3),
('M', 9, 6, 3);

INSERT INTO stock (cantidad_actual, cantidad_eliminada, cantidad_agregada, id_talla) VALUES 
(12, 0, 0, 1),
(10, 0, 0, 2),
(8, 0, 0, 3),
(5, 0, 0, 4),
(15, 0, 0, 5),
(10, 0, 0, 6),
(20, 0, 0, 7),
(18, 0, 0, 8),
(22, 0, 0, 9),
(16, 0, 0, 10),
(14, 0, 0, 11),
(9, 0, 0, 12);

INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla) VALUES 
(12, 'New product added', CURRENT_DATE, CURRENT_TIME, 1),
(10, 'New product added', CURRENT_DATE, CURRENT_TIME, 2),
(8, 'New product added', CURRENT_DATE, CURRENT_TIME, 3),
(5, 'New product added', CURRENT_DATE, CURRENT_TIME, 4),
(15, 'New product added', CURRENT_DATE, CURRENT_TIME, 5),
(10, 'New product added', CURRENT_DATE, CURRENT_TIME, 6),
(20, 'New product added', CURRENT_DATE, CURRENT_TIME, 7),
(18, 'New product added', CURRENT_DATE, CURRENT_TIME, 8),
(22, 'New product added', CURRENT_DATE, CURRENT_TIME, 9),
(16, 'New product added', CURRENT_DATE, CURRENT_TIME, 10),
(14, 'New product added', CURRENT_DATE, CURRENT_TIME, 11),
(9, 'New product added', CURRENT_DATE, CURRENT_TIME, 12);

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
