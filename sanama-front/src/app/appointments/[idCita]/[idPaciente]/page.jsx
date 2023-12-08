"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { patientService } from "@/services/patientService";
import { appointmentService } from "@/services/appointmentService";
import { attentionService } from "@/services/attentionService";
import { doctorService } from "@/services/doctorService";
import MedicalRecordsTable from "@/components/MedicalRecordsTable";
import usePatientForm from "@/hooks/usePatientForm";
import { parseHojaMedicaTable } from "@/util/medicalRecordParser";
import { sexParser } from "@/util/patientParser";
import TitleWithIcon from "@/components/TitleWithIcon";
import LaboratoryModal from "@/components/evaluations/LaboratoryModal";
import iconoHistorial from "@/components/icons/iconoHistorial";

const HistorialClinico = () => {
  const params = useParams();
  const pathname = usePathname();
  const idPaciente = params.idPaciente;
  const idCita = params.idCita;
  const router = useRouter();

  const [historialClinico, setHistorialClinico] = useState(null);
  const [hojasMedicas, setHojasMedicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idValue, setIdValue] = useState(null);
  const { patientForm, setPatientForm } = usePatientForm();

  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadId, setEspecialidadId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const fetchCitaStatus = async () => {
    try {
      const data = await appointmentService.getStatusCita(idCita);
      const idValue = data.idValue;
      setIdValue(data.idValue);
    } catch (error) {
      console.error(error);
    }
  };
  fetchCitaStatus();

  useEffect(() => {
    fetchCitaStatus();
  }, [idCita]);

  const isEvaluationButtonDisabled =
    idValue === 1 || idValue === 4 || idValue === 5;
  const isOrderButtonDisabled = idValue === 2 || idValue === 4 || idValue === 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [patientData, medicalHistoryData] = await Promise.all([
        patientService.mostrarPacienteRegistrado(idPaciente),
        patientService.buscarHistorialClinico(idPaciente),
      ]);

      setPatientForm((prevForm) => ({
        ...prevForm,
        ...patientData,
        sexo: sexParser(patientData.sexo),
      }));

      const tableData = parseHojaMedicaTable(medicalHistoryData.hojasMedicas);
      setHistorialClinico({
        idHistorialClinico: medicalHistoryData.idHistorialClinico,
        codigo: medicalHistoryData.codigo,
        estadoHojaMedica: true,
      });
      setHojasMedicas(tableData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [idPaciente, setPatientForm]);

  useEffect(() => {
    if (idPaciente) {
      fetchData();
    }
  }, [idPaciente, fetchData]);

  useEffect(() => {
    const cargarEspecialidades = async () => {
      const especialidadesData = await doctorService.listarEspecialidades();
      setEspecialidades(especialidadesData || []);
    };
    cargarEspecialidades();
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      const filteredData = await attentionService.listarHojasMedicasFiltro({
        pn_id_paciente: idPaciente,
        pn_id_especialidad: especialidadId || null,
        pd_fecha_inicio: fechaInicio || null,
        pd_fecha_fin: fechaFin || null,
      });

      setHojasMedicas(parseHojaMedicaTable(filteredData));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [especialidadId, fechaInicio, fechaFin, idPaciente]);

  const handleNewMedicalEvaluation = useCallback(() => {
    router.push(`${pathname}/new/`);
  }, [router, pathname]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const options = [
    {
      text: "Ver hoja médica",
      link: "/",
      icon: "fa fa-eye",
    },
    {
      text: "Ver laboratorios",
      link: "/laboratories",
      icon: "fa fa-file",
    },
  ];

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el historial clínico</p>;
  if (!historialClinico) return <p>No se encontró el historial clínico</p>;
  return (
    <section className="p-4 md:p-14 h-screen">
      <TitleWithIcon name={`Atencion Medica`} Icon={iconoHistorial} />
      <div className="bg-gray-100 max-h-screen p-4 md:p-8">
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-4">
            Historial Clínico: {historialClinico.codigo}
          </h1>
          <div className="flex flex-wrap mb-2 space-x-32 px-4">
            <div className="flex-1 min-w-1/2">
              <p className="flex justify-between">
                <strong className="mr-2">Nombre:</strong>
                <span>{`${patientForm.nombres} ${patientForm.apellidoPaterno} ${patientForm.apellidoMaterno}`}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">DNI:</strong>
                <span>{patientForm.dni}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Fecha de Nacimiento:</strong>
                <span>{patientForm.fechaNacimiento}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Sexo:</strong>
                <span>{patientForm.sexo}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Código de Seguro:</strong>
                <span>{patientForm.codigoSeguro}</span>
              </p>
            </div>
            <div className="flex-1 min-w-1/2">
              <p className="flex justify-between">
                <strong className="mr-2">Dirección:</strong>
                <span>{patientForm.direccion}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Teléfono:</strong>
                <span>{patientForm.telefono}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Correo Electrónico:</strong>
                <span>{patientForm.correo}</span>
              </p>
              <p className="flex justify-between">
                <strong className="mr-2">Tipo de Seguro:</strong>
                <span>{patientForm.tipoSeguro}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex mb-6 space-x-4">
          <button
            type="button"
            className={`font-bold py-2 px-4 rounded ${isEvaluationButtonDisabled
              ? "bg-gray-500"
              : "bg-green-500 hover:bg-green-700"
              } text-white`}
            onClick={handleNewMedicalEvaluation}
            disabled={isEvaluationButtonDisabled}
          >
            Nueva Evaluacion Medica
          </button>
          <button
            onClick={handleOpenModal}
            className={`font-bold py-2 px-4 rounded ${isOrderButtonDisabled
              ? "bg-gray-500"
              : "bg-blue-500 hover:bg-blue-700"
              } text-white`}
            disabled={isOrderButtonDisabled}
          >
            Nueva Orden de Laboratorio
          </button>

          <LaboratoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            appointmentId={idCita}
          />
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Hojas Medicas Existentes:
          </h2>
          <div className="flex gap-4 rounded-md m-2">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="especialidadId"
                className="block text-sm font-medium text-gray-700"
              >
                Especialidad
              </label>
              <select
                id="especialidadId"
                value={especialidadId}
                onChange={(e) => setEspecialidadId(e.target.value)}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((especialidad) => (
                  <option
                    key={especialidad.idEspecialidad}
                    value={especialidad.idEspecialidad}
                  >
                    {especialidad.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="fechaFin"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="fechaFin"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Fin
              </label>
              <input
                type="date"
                id="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex align-bottom justify-center rounded-md border border-transparent bg-blue-600 mt-6 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
          <MedicalRecordsTable
            data={hojasMedicas}
            options={options}
          ></MedicalRecordsTable>
        </div>
      </div>
    </section>
  );
};

export default HistorialClinico;
