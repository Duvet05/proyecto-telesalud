// hooks/useDiagnostics.js
import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";

export const useDiagnostics = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);

  const fetchData = async (filtro) => {
    try {
      setLoading(true);
      const data = await attentionService.listarDiagnosticosFiltro(filtro);
      setSearchResults(data);
    } catch (error) {
      console.log("No se pudo obtener los datos de los diagnósticos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      fetchData(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const handleDiagnosticSelect = (selectedDiagnostic) => {
    setSelectedDiagnostic(selectedDiagnostic);
    setSearchResults([]);
    setSearchText("");
  };

  const resetData = () => {
    setSelectedDiagnostic(null);
    setSearchText("");
  };

  return {
    searchText,
    setSearchText,
    searchResults,
    loading,
    selectedDiagnostic,
    handleDiagnosticSelect,
    resetData,
  };
};
