"use client";
import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";

const usePatientTriageData = (idCita) => {
  const [patientTriageData, setPatientTriageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idCita) return;
    setLoading(true);
    attentionService
      .buscarTriageCitaHojaMedica(idCita)
      .then((data) => {
        if (data) {
          setPatientTriageData(data);
        } else {
          setError(`No se encontraron datos de la cita con el ID ${idCita}`);
        }
      })
      .catch((error) => {
        setError("Ocurrió un error al cargar los datos del triaje y nombres");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idCita]);

  return { patientTriageData, loading, error };
};

export default usePatientTriageData;
