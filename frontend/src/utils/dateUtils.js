/**
 * Utilidades para dar formato a fechas y horas
 */

/**
 * Convierte una fecha en formato ISO (YYYY-MM-DD) a formato "Día número mes año"
 * @param {string} isoDate - Fecha en formato ISO (YYYY-MM-DD)
 * @returns {string} Fecha formateada como "Día número mes año"
 */
export const formatDate = (isoDate) => {
    if (!isoDate) return '';
    
    // Fix timezone issue by parsing the date correctly
    // The format is YYYY-MM-DD, so we need to ensure it's treated as UTC
    const parts = isoDate.split('T')[0].split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are 0-indexed in JS
    const day = parseInt(parts[2]);
    
    const date = new Date(year, month, day);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return isoDate;
    
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const dia = dias[date.getDay()];
    const numero = date.getDate();
    const mes = meses[date.getMonth()];
    const anio = date.getFullYear();
    
    return `${dia} ${numero} ${mes} ${anio}`;
  };
  
  /**
   * Convierte una hora en formato de 24 horas (HH:MM:SS) a formato "HH:MM AM/PM"
   * @param {string} time - Hora en formato de 24 horas (HH:MM:SS)
   * @returns {string} Hora formateada como "HH:MM AM/PM"
   */
  export const formatTime = (time) => {
    if (!time) return '';
    
    // Si la hora incluye milisegundos, los eliminamos
    const timeParts = time.split('.');
    const timeWithoutMs = timeParts[0];
    
    // Dividir la hora en horas, minutos y segundos
    const [hours, minutes] = timeWithoutMs.split(':');
    
    // Convertir a formato de 12 horas
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    // Ajustar la hora para el formato de 12 horas
    hour = hour % 12;
    hour = hour ? hour : 12; // La hora '0' debe ser '12' en formato de 12 horas
    
    return `${hour}:${minutes} ${ampm}`;
  };
  
  /**
   * Formatea una fecha y hora combinadas
   * @param {string} date - Fecha en formato ISO (YYYY-MM-DD)
   * @param {string} time - Hora en formato de 24 horas (HH:MM:SS)
   * @returns {string} Fecha y hora formateadas
   */
  export const formatDateTime = (date, time) => {
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);
    
    if (formattedDate && formattedTime) {
      return `${formattedDate} a las ${formattedTime}`;
    } else if (formattedDate) {
      return formattedDate;
    } else if (formattedTime) {
      return formattedTime;
    }
    
    return '';
  };