
/* //////////////////////////////////////
                TRIGGER
////////////////////////////////////// */

CREATE FUNCTION insertar_stock_al_crear_talla()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO stock (id_talla, cantidad_actual, cantidad_eliminada, cantidad_agregada)
    VALUES (NEW.id_talla, NEW.cantidad, 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_insertar_stock
AFTER INSERT ON talla
FOR EACH ROW
EXECUTE FUNCTION insertar_stock_al_crear_talla();

/* ///////////////////////////////////////////////////////////////////////// */

CREATE FUNCTION actualizar_stock_al_modificar_talla()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cantidad < OLD.cantidad THEN
        UPDATE stock
        SET cantidad_actual = NEW.cantidad,
            cantidad_eliminada = cantidad_eliminada + (OLD.cantidad - NEW.cantidad)
        WHERE id_talla = NEW.id_talla;
    
    ELSIF NEW.cantidad > OLD.cantidad THEN
        UPDATE stock
        SET cantidad_actual = NEW.cantidad,
            cantidad_agregada = cantidad_agregada + (NEW.cantidad - OLD.cantidad)
        WHERE id_talla = NEW.id_talla;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_stock
AFTER UPDATE ON talla
FOR EACH ROW
WHEN (OLD.cantidad IS DISTINCT FROM NEW.cantidad)
EXECUTE FUNCTION actualizar_stock_al_modificar_talla();

/* ///////////////////////////////////////////////////////////////////////// */

CREATE OR REPLACE FUNCTION insert_historial_stock()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla)
    VALUES (NEW.cantidad, 'New product added', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', NEW.id_talla);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_insert_historial_stock
AFTER INSERT ON talla
FOR EACH ROW
EXECUTE FUNCTION insert_historial_stock();

/* ///////////////////////////////////////////////////////////////////////// */

CREATE OR REPLACE FUNCTION update_historial_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cantidad > OLD.cantidad THEN
        INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla)
        VALUES (NEW.cantidad - OLD.cantidad, 'Product added', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', NEW.id_talla);
    ELSIF NEW.cantidad < OLD.cantidad THEN
        INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla)
        VALUES (OLD.cantidad - NEW.cantidad, 'Product removed', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', NEW.id_talla);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_historial_stock
AFTER UPDATE ON talla
FOR EACH ROW
WHEN (NEW.cantidad <> OLD.cantidad)
EXECUTE FUNCTION update_historial_stock();

/* ///////////////////////////////////////////////////////////////////////// */

CREATE OR REPLACE FUNCTION insert_historial_pedido()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO historial_pedido (estado_seguimiento, fecha, hora, id_pedido)
    VALUES (NEW.estado_pedido, CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', NEW.id_pedido);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_insert_historial_pedido
AFTER INSERT ON pedido
FOR EACH ROW
EXECUTE FUNCTION insert_historial_pedido();

CREATE OR REPLACE FUNCTION update_historial_pedido()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.estado_pedido <> NEW.estado_pedido THEN
        INSERT INTO historial_pedido (estado_seguimiento, fecha, hora, id_pedido)
        VALUES (NEW.estado_pedido, CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', NEW.id_pedido);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_historial_pedido
AFTER UPDATE OF estado_pedido ON pedido
FOR EACH ROW
EXECUTE FUNCTION update_historial_pedido();

/* ///////////////////////////////////////////////////////////////////////// */

CREATE OR REPLACE FUNCTION update_stock_and_historial()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE talla
    SET cantidad = cantidad - NEW.cantidad_total
    WHERE id_talla = NEW.id_talla;

    INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla)
    VALUES (NEW.cantidad_total, 'Product ordered by customer', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', CURRENT_TIMESTAMP AT TIME ZONE 'America/Tijuana', NEW.id_talla);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_stock_and_historial
AFTER INSERT ON solicitud_producto
FOR EACH ROW
EXECUTE FUNCTION update_stock_and_historial();

/* /////////////faltan la actualizacion de estados automaticos///////////////////// */

CREATE OR REPLACE FUNCTION actualizar_estado_solicitud()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE solicitud s
    SET estado_solicitud = NEW.estado_pedido
    FROM solicitud_producto sp
    WHERE sp.id_solicitud = s.id_solicitud
    AND sp.id_solicitud_producto = NEW.id_solicitud_producto;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_estado_solicitud
AFTER UPDATE OF estado_pedido ON pedido
FOR EACH ROW
WHEN (OLD.estado_pedido IS DISTINCT FROM NEW.estado_pedido)
EXECUTE FUNCTION actualizar_estado_solicitud();

