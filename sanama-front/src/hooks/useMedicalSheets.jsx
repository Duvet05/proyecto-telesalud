import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";

export const useMedicalSheets = () => {
  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedicalSheet, setSelectedMedicalSheet] = useState(null);

  const fetchMedicalSheets = async (filtro) => {
    try {
      setLoading(true);
      const data = await attentionService.listarHojasMedicasFiltro(filtro);
      setSearchResults(data);
    } catch (error) {
      console.error("No se pudo obtener los datos de las hojas médicas", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchFilters) {
      fetchMedicalSheets(searchFilters);
    } else {
      setSearchResults([]);
    }
  }, [searchFilters]);

  const handleMedicalSheetSelect = (medicalSheet) => {
    setSelectedMedicalSheet(medicalSheet);
    setSearchResults([]);
    setSearchFilters(null);
  };

  const resetData = () => {
    setSearchResults([]);
    setSelectedMedicalSheet(null);
    setSearchFilters(null);
  };

  return {
    searchFilters,
    setSearchFilters,
    searchResults,
    loading,
    selectedMedicalSheet,
    handleMedicalSheetSelect,
    resetData,
  };
};
