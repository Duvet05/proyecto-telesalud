"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { appointmentService } from "@/services/appointmentService";
import PatientInfo from "@/components/appointments/view/PatientInfo";
import RescheduleModal from "@/components/appointments/view/RescheduleModal";
import useUpdateAppointmentStatus from "@/hooks/useUpdateAppointmentStatus";
import TitleWithIcon from "@/components/TitleWithIcon";
import ActionButtons from "@/components/appointments/view/ActionButtons";
import viewAppointmentIcon from "@/components/icons/viewAppointmentIcon";
import { toast } from "sonner";
import { MdArrowBack } from 'react-icons/md';

const ReviewAppointment = ({ params }) => {
  const pathname = usePathname();
  const [state, setState] = useState({
    appointmentData: null,
    loading: true,
    error: null,
    hasBeenCanceled: false,
    isRescheduleModalOpen: false,
  });
  const router = useRouter();

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await appointmentService.buscarCita(params.idCita);
        updateState({
          appointmentData: data,
          loading: false,
        });
      } catch (error) {
        updateState({
          error: "Error al cargar los datos de la cita",
          loading: false,
        });
        console.error(error);
      }
    };
    fetchData();
  }, [params.idCita]);

  const { updateAppointmentStatus } = useUpdateAppointmentStatus();

  const handleActionClick = useCallback(
    async (status) => {
      return new Promise(async (resolve, reject) => {
        updateState({ loading: true });
        try {
          await updateAppointmentStatus(state.appointmentData.idCita, status);
          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        } finally {
          updateState({ loading: false });
        }
      });
    },
    [state.appointmentData, updateAppointmentStatus]
  );

  const handleAttendClick = useCallback(() => {
    handleActionClick(2)
      .then(() => {
        router.push(`${pathname}/${state.appointmentData.paciente.idPersona}`);
      })
      .catch((error) => {
        console.error("Error al asistir: ", error);
      });
  }, [handleActionClick, state.appointmentData, pathname, router]);

  const handleCancelClick = useCallback(async () => {
    updateState({ loading: true });

    try {
      await handleActionClick(3);
      toast.success("Cita cancelada exitosamente");
      updateState({ hasBeenCanceled: true, loading: false });
    } catch (error) {
      console.error("Error al cancelar la cita", error);
      toast.error("Error al cancelar la cita");
      updateState({ loading: false });
    }
  }, [handleActionClick]);

  if (!state.appointmentData) return null;

  return (
    <>
      <div className="flex justify-end ">
        <div className="flex-end pr-14 pf-14">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
            onClick={() => router.back()}
          >
            <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
            Volver
          </button>
        </div>
      </div>

      <section className="w-full px-14 py-6">
        <TitleWithIcon name={"Cita Medica"} Icon={viewAppointmentIcon} />

        <div className="flex place-content-between w-full mb-4 justify-end">

          
          <div className="flex">
            <ActionButtons
              estado={state.appointmentData.estado}
              loading={state.loading}
              openRescheduleModal={() =>
                updateState({ isRescheduleModalOpen: true })
              }
              handleCancelClick={handleCancelClick}
              hasBeenCanceled={state.hasBeenCanceled}
              handleAttendClick={handleAttendClick}
              idMedico={state.appointmentData.medico.idPersona}
              idPaciente={state.appointmentData.paciente.idPersona}
            />
          </div>
        </div>
        <PatientInfo
          pacienteData={state.appointmentData.paciente}
          appointmentData={state.appointmentData}
          doctor={state.appointmentData.medico}
        />

        <RescheduleModal
          isOpen={state.isRescheduleModalOpen}
          onClose={() => updateState({ isRescheduleModalOpen: false })}
          medicId={String(state.appointmentData.medico.idPersona)}
          appointmentId={String(state.appointmentData.idCita)}
        />
      </section>
    </>
  );
};

export default ReviewAppointment;
