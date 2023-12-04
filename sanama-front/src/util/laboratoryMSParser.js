export const parseLaboratoryMSTable = (data) => {
  return data.resultados.map((resultado) => {
    const downloadUrl = `data:application/pdf;base64,${resultado.archivo}`;
    return {
      nombreArchivo: resultado.nombre,
      medicoFirmante: resultado.medicoFirmante,
      tipoMuestra: resultado.tipoMuestra,
      downloadUrl, 
    };
  });
};
  