
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
    VALUES (NEW.cantidad, 'New product added', CURRENT_DATE, CURRENT_TIME, NEW.id_talla);
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
        VALUES (NEW.cantidad - OLD.cantidad, 'Product added', CURRENT_DATE, CURRENT_TIME, NEW.id_talla);
    ELSIF NEW.cantidad < OLD.cantidad THEN
        INSERT INTO historial_stock (cantidad, descripcion_historial_stock, fecha_historial_stock, hora_historial_stock, id_talla)
        VALUES (OLD.cantidad - NEW.cantidad, 'Product removed', CURRENT_DATE, CURRENT_TIME, NEW.id_talla);
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
