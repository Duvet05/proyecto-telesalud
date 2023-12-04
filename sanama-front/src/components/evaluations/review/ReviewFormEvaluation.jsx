import React from "react";
import Accordion from "@/components/evaluations/acordeon";
import InputField from "@/components/common/InputField";
import TextAreaField from "@/components/common/TextAreaField";
import {
  calcularEdad,
  calcularIMC,
  formatearFecha,
  getDescription,
} from "@/util/formValidations";

const ReviewFormEvaluation = ({ patientData, hojaMedicaData }) => {
  if (!patientData) {
    return <p>Cargando...</p>;
  }
  console.log("Error:", hojaMedicaData);
  const edad = calcularEdad(patientData.fechaNacimiento);
  const fechaNacimientoFormateada = formatearFecha(patientData.fechaNacimiento);
  const sexo = patientData.sexo === "M" ? "Masculino" : "Femenino";
  const evaluacionMedica = hojaMedicaData.evaluacionMedica;
  const recetaMedica = hojaMedicaData.recetaMedica;
  const medicamentos = recetaMedica.medicamentos;
  const vitalSigns = evaluacionMedica.signosVitales || {};
  const IMC = vitalSigns ? calcularIMC(vitalSigns.peso, vitalSigns.talla) : "-";
  const diagnosticos = evaluacionMedica.diagnosticos;

  return (
    <>
      <div className="col-span-2">
        <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
          Datos del Pacientes
        </h4>

        <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputField
            label="Paciente"
            value={`${patientData.nombres} ${patientData.apellidoPaterno} ${patientData.apellidoMaterno}`}
            disabled
            readOnly
          />
          <InputField
            label="Fecha de Nacimiento"
            value={fechaNacimientoFormateada}
            disabled
            readOnly
          />
          <InputField label="Edad" value={edad} readOnly disabled />
          <InputField label="Sexo" value={sexo} readOnly disabled />
          <InputField
            label="Peso (kg)"
            value={
              evaluacionMedica.signosVitales
                ? evaluacionMedica.signosVitales.peso
                : "-"
            }
            readOnly
            disabled
          />
          <InputField
            label="Talla (cm)"
            value={
              evaluacionMedica.signosVitales
                ? evaluacionMedica.signosVitales.talla
                : "-"
            }
            readOnly
            disabled
          />
        </div>
      </div>

      <Accordion title="Motivo de la Consulta" id="triage" active={true}>
        <div className="ml-4 grid mb-4 gap-4">
          <TextAreaField
            label="Antecedentes:"
            name="evaluacionMedica.antecedentes"
            placeholder="Ingresa los antecentes.."
            data={evaluacionMedica.antecedentes}
          />
          <TextAreaField
            label="Motivo de Consulta:"
            name="evaluacionMedica.motivoConsulta"
            placeholder="Ingresa el motivo.."
            data={evaluacionMedica.motivoConsulta}
          />
          <TextAreaField
            label="Observaciones Adicionales:"
            name="evaluacionMedica.observaciones"
            placeholder="Ingresa observación.."
            data={evaluacionMedica.observaciones}
          />
        </div>
      </Accordion>

      <Accordion title="Signos Vitales" id="triage" active={true}>
        <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputField
            key={"imc"}
            label={"Indice de Masa Corporal (IMC)"}
            value={IMC}
            readOnly
            disabled
          />
          <InputField
            key={"temperatura"}
            label={"Temperatura (°C)"}
            value={vitalSigns.temperatura}
            readOnly
            disabled
          />
          <InputField
            key={"frecuenciaCardiaca"}
            label={"Frecuencia Cardiaca (FC)"}
            value={vitalSigns.frecuenciaCardiaca}
            readOnly
            disabled
          />
          <InputField
            key={"frecuenciaRespiratoria"}
            label={"Frecuencia Respiratoria (FR)"}
            value={vitalSigns.frecuenciaRespiratoria}
            readOnly
            disabled
          />
          <InputField
            key={"presionArterial"}
            label={"Presión Arterial (Sistolica / Diastolica)"}
            value={vitalSigns.presionArterial}
            readOnly
            disabled
          />
          <InputField
            key={"saturacionOxigeno"}
            label={"Saturación de Oxígeno (%)"}
            value={vitalSigns.saturacionOxigeno}
            readOnly
            disabled
          />
        </div>
      </Accordion>

      <Accordion title="Exploracion Fisica" id="expfisica" active={true}>
        <div className="ml-2 mr-4 resize-none grid grid-cols-1 md:grid-cols-2 gap-4">
          {evaluacionMedica.examenGeneral && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Examen General
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.examenGeneral}
              />
            </div>
          )}

          {evaluacionMedica.pielYFaneras && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Piel y Faneras
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.pielYFaneras}
              />
            </div>
          )}

          {evaluacionMedica.cabezaYCuello && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Cabeza y Cuello
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.cabezaYCuello}
              />
            </div>
          )}

          {evaluacionMedica.toraxYPulmones && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Tórax y Pulmones
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.toraxYPulmones}
              />
            </div>
          )}

          {evaluacionMedica.toraxYPulmones && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Tórax y Pulmones
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.toraxYPulmones}
              />
            </div>
          )}

          {evaluacionMedica.cardiovascular && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Cardiovascular
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.cardiovascular}
              />
            </div>
          )}

          {evaluacionMedica.abdomen && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Abdomen
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.abdomen}
              />
            </div>
          )}

          {evaluacionMedica.urogenital && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Urogenital
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.urogenital}
              />
            </div>
          )}

          {evaluacionMedica.extremidades && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Extremidades
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.extremidades}
              />
            </div>
          )}

          {evaluacionMedica.snc && (
            <div className="flex col-span-2 ">
              <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
                Sistema Nervioso Central
              </label>
              <span className="mr-4">:</span>
              <textarea
                readOnly
                disabled
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                rows={3}
                value={evaluacionMedica.snc}
              />
            </div>
          )}
        </div>
      </Accordion>

      <Accordion title="Nivel de Consciencia" id="glasgow" active={true}>
        <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            key={"glasgow"}
            label={"Prueba de Glasgow"}
            value={evaluacionMedica.glasgow}
            readOnly
            disabled
          />
          <InputField
            key={"eyesOpen"}
            label={"Abertura Ocular"}
            value={getDescription("eyesOpen", evaluacionMedica.eyesOpen)}
            readOnly
            disabled
          />
          <InputField
            key={"talkingCorrectly"}
            label={"Respuesta Verbal)"}
            value={getDescription(
              "talkingCorrectly",
              evaluacionMedica.talkingCorrectly
            )}
            readOnly
            disabled
          />
          <InputField
            key={"ableToMoveBody"}
            label={"Respuesta Motriz"}
            value={getDescription(
              "ableToMoveBody",
              evaluacionMedica.ableToMoveBody
            )}
            readOnly
            disabled
          />
        </div>
      </Accordion>

      <Accordion title="Diagnostico" id="diagnostico" active={true}>
        <div className="w-full grid mt-4">
          <table className="w-3/6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">CIE-10</th>
                <th className="px-6 py-3">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {diagnosticos.map((diagnostico, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{diagnostico.idCiex}</td>
                  <td className="px-6 py-3">{diagnostico.ciex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="Receta Medica" id="receta" active={true}>
        <div className="w-full grid mt-4">
          <table className="w-3/6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Medicamento</th>
                <th className="px-6 py-3">Indicaciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((medicamento, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-3">{medicamento.nombre}</td>
                  <td className="px-6 py-3">{medicamento.indicacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-2 ">
          <div className="w-[200px] mt-2">
            <InputField
              key={"fechaCaducidad"}
              label={"Fecha de Caducidad"}
              value={recetaMedica.fechaCaducidad}
              readOnly
              disabled
            />
          </div>
          <label className="block resize-none text-sm font-medium text-gray-700 w-1/6">
            Indicaciones Finales:
          </label>
          <textarea
            readOnly
            disabled
            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            rows={3}
            value={evaluacionMedica.indicacionesFinales}
          />
        </div>
      </Accordion>
    </>
  );
};

export default ReviewFormEvaluation;
