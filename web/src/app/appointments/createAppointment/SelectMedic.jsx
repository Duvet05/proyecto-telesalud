import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import SelectDate from "./SelectDate";
import { medicService } from "@/services/medicService";
import { useAppointments } from "@/context/AppointmentsContext";

function SeleccionarMedico() {
  const { appointmentData, setAppointmentData } = useAppointments();

  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const fetchAvailableHours = (fecha, medicId) => {
    medicService
      .buscarHorariosByID(fecha, medicId)
      .then((data) => {
        setAppointmentData((prev) => ({ ...prev, availableHours: data }));
      })
      .catch((error) => {
        console.error("Error fetching available hours:", error);
      });
  };

  const fetchAvailableDays = (medicId) => {
    medicService
      .DiasDisponiblesByID(medicId)
      .then((data) => {
        setAppointmentData((prev) => ({ ...prev, availableDays: data }));
      })
      .catch((error) => {
        console.error("Error fetching available days:", error);
      });
  };

  useEffect(() => {
    if (appointmentData.selectedDoctor) {
      fetchAvailableDays(appointmentData.selectedDoctor.idPersona);
    }
  }, [appointmentData.selectedDoctor]);

  useEffect(() => {
    if (appointmentData.selectedDate && appointmentData.selectedDoctor) {
      fetchAvailableHours(
        appointmentData.selectedDate,
        appointmentData.selectedDoctor.idPersona
      );
    }
  }, [appointmentData.selectedDate, appointmentData.selectedDoctor]);

  useEffect(() => {
    medicService
      .listarEspecialidades()
      .then((data) => {
        setSpecialties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching specialties:", error);
      });
  }, []);

  const obtenerDoctoresPorEspecialidad = async (especialidadNombre) => {
    try {
      const data = await medicService.buscarPorEspecialidad(especialidadNombre);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
      alert(
        "Ocurrió un error al buscar los médicos. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleHourChange = (hour) => {
    const formattedHour = dayjs(hour).format("HH:mm:ss");
    setAppointmentData((prevData) => ({
      ...prevData,
      selectedHour: formattedHour,
    }));
  };

  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="w-full">
        <label
          htmlFor="speciality"
          className="block text-sm font-medium text-gray-700"
        >
          Especialidad
        </label>
        <select
          id="speciality"
          disabled={isLoading}
          value={selectedSpeciality?.nombre || ""}
          onChange={async (e) => {
            const newSpeciality = specialities.find(
              (s) => s.nombre === e.target.value
            );
            setSelectedSpeciality(newSpeciality);
            setAppointmentData((prevData) => ({
              ...prevData,
              selectedDoctor: "",
            }));
            if (newSpeciality) {
              await obtenerDoctoresPorEspecialidad(newSpeciality.nombre);
            } else {
              setDoctors([]);
            }
          }}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Seleccionar Especialidad
          </option>
          {specialities.map((speciality) => (
            <option key={speciality.nombre} value={speciality.nombre}>
              {speciality.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedSpeciality && (
        <div className="w-full">
          <label
            htmlFor="doctor"
            className="block text-sm font-medium text-gray-700"
          >
            Médico
          </label>
          <select
            id="doctor"
            value={appointmentData.selectedDoctor?.idPersona || ""}
            onChange={(e) => {
              const doctorId = parseInt(e.target.value, 10);
              const selectedDoc = doctors.find(
                (doctor) => doctor.idPersona === doctorId
              );
              setAppointmentData((prevData) => ({
                ...prevData,
                selectedDoctor: selectedDoc,
              }));
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Seleccionar Médico
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.idPersona} value={doctor.idPersona}>
                {`${doctor.sexo === "M" ? "Dr." : "Dra."} ${doctor.nombres} ${
                  doctor.apellidoPaterno
                } ${doctor.apellidoMaterno}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {appointmentData.selectedDoctor && (
        <SelectDate
          onDateChange={(date) => {
            setAppointmentData((prevData) => ({
              ...prevData,
              selectedDate: dayjs(date).format("YYYY-MM-DD"),
            }));
          }}
          selectedDate={appointmentData.selectedDate}
          onHourChange={handleHourChange}
          selectedHour={appointmentData.selectedHour}
        />
      )}
    </div>
  );
}

export default SeleccionarMedico;
