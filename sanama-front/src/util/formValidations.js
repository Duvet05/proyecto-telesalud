import { format, parseISO } from "date-fns";

export function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())
  ) {
    edad--;
  }
  return edad;
}

export function calcularIMC(peso, altura) {
  const pesoNum = Number(peso);
  const alturaNum = Number(altura);

  if (alturaNum > 0 && pesoNum > 0) {
    const imc = pesoNum / (alturaNum * alturaNum);
    return Math.round(imc * 100) / 100; // Redondea a dos decimales
  } else {
    return 0;
  }
}

export function formatearFecha(fecha) {
  try {
    const fechaParsed = parseISO(fecha);
    return format(fechaParsed, "dd/MM/yyyy");
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return fecha; // Devuelve la fecha original en caso de error
  }
}

export function validateNumberInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
  if (input.value.length > 8) {
    input.value = input.value.slice(0, 8);
  }
}

export function validateTextInput(input) {
  input.value = input.value.replace(/[^A-Za-z\s]/g, "");
}

export function validateSecurityCode(input) {
  let value = input.value.toUpperCase();

  // Si los primeros tres caracteres no son letras mayúsculas, los eliminamos
  if (value.length <= 3) {
    value = value.replace(/[^A-Z]/g, "");
  }
  // Si la longitud es mayor que 3, nos aseguramos de que los siguientes tres caracteres sean números
  else if (value.length > 3 && value.length <= 6) {
    let letters = value.substring(0, 3).replace(/[^A-Z]/g, "");
    let numbers = value.substring(3).replace(/[^0-9]/g, "");
    value = letters + numbers;
  }

  input.value = value;
}

export function formatHour(hour) {
  try {
    const [hours, minutes, seconds] = hour.split(":");
    if (!hours || !minutes || !seconds)
      throw new Error("Formato de hora inválido");
    const date = new Date();
    date.setHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    );
    return format(date, "HH:mm");
  } catch (error) {
    console.error("Error al formatear la hora:", error);
    return hour; // Devuelve la hora original en caso de error
  }
}

// gcsUtils.js

const gcsDescriptions = {
  eyesOpen: {
    4: "Espontánea",
    3: "Al estímulo verbal",
    2: "Al estímulo doloroso",
    1: "Sin respuesta",
  },
  talkingCorrectly: {
    5: "Orientado y conversando",
    3: "Palabras inapropiadas",
    2: "Sonidos incomprensibles",
    1: "Sin respuesta",
  },
  ableToMoveBody: {
    6: "Obedece órdenes verbales",
    5: "Localiza el dolor",
    4: "Retirada al dolor",
    3: "Flexión anormal al dolor",
    2: "Extensión anormal al dolor",
    1: "Sin respuesta",
  },
};

export const getDescription = (category, value) => {
  return gcsDescriptions[category][value] || "No definido";
};
