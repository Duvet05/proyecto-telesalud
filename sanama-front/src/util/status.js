const STATUS = {
  ATTENDED: 1,
  IN_CONSULTATION: 2,
  CANCELLED: 3,
  PENDING: 4,
  IN_TRIAGE: 5,
};

export function getStatus(estado) {
  const statusMapping = {
    [STATUS.ATTENDED]: { text: "Atendida", className: "highlight-blue" },
    [STATUS.IN_CONSULTATION]: {
      text: "Consultorio",
      className: "highlight-orange",
    },
    [STATUS.CANCELLED]: { text: "Cancelada", className: "highlight-red" },
    [STATUS.PENDING]: { text: "Pendiente", className: "highlight-green" },
    [STATUS.IN_TRIAGE]: { text: "En Triaje", className: "highlight-yellow" },
  };
  return statusMapping[estado] || "Desconocido";
}
