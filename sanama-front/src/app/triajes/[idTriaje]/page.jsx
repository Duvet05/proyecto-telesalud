"use client";

import { useEffect, useState } from "react";
import { triajeService } from "@/services/triajeService";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MdArrowBack } from 'react-icons/md'; 
import { useRouter, usePathname } from "next/navigation";
const TriajeProfile = ({ params }) => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [glasgow, setGlasgow] = useState(0);

  const [eyesOpen, setEyesOpen] = useState('');
  const [talkingCorrectly, setTalkingCorrectly] = useState('');
  const [ableToMoveBody, setAbleToMoveBody] = useState('');

  const calculateGlasgow = (eyesOpen, talkingCorrectly, ableToMoveBody) => {
    const scores = {
      "Ninguna": 1,
      "Respuesta al Dolor": 2,
      "Respuesta al Estímulo Verbal": 3,
      "Espontánea": 4,
      "Sonidos Incomprensibles": 2,
      "Palabras Inapropiadas": 3,
      "Confuso": 4,
      "Orientado": 5,
      "Extensión al Dolor": 2,
      "Flexión al Dolor": 3,
      "Retirada del Dolor": 4,
      "Localización del Dolor": 5,
      "Obedece Órdenes": 6
    };

    let totalScore = 0;
    totalScore += scores[eyesOpen] || 0;
    totalScore += scores[talkingCorrectly] || 0;
    totalScore += scores[ableToMoveBody] || 0;

    return totalScore;
  };

  useEffect(() => {
    const newGlasgow = calculateGlasgow(eyesOpen, talkingCorrectly, ableToMoveBody);
    setGlasgow(newGlasgow);
  }, [eyesOpen, talkingCorrectly, ableToMoveBody]);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const [dataTriaje, setDataTriaje] = useState({
    idTriaje: null,
    codigoTriaje: "",
    peso: null,
    talla: null,
    temperatura: null,
    motivoVisita: "",

    // presionArterial: null,

    presionSistolica: null,
    presionDiastolica: null,

    estado: null,
    prioridad: "",
    fechaTriaje: "",
    horaTriaje: "",
    saturacionOxigeno: "",
    frecuenciaCardiaca: "",

    nivelConciencia: "",

    glasgow: "",
    eyesOpen: "",
    talkingCorrectly: "",
    ableToMoveBody: "",

    nivelDolor: "",
    condicionesPrexistentes: "",
    paciente: {
      idPersona: null,
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      dni: "",
      fechaNacimiento: "",
      sexo: "",
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [missingFieldsModal, setMissingFieldsModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const fieldNames = {
    pn_id_triaje: "ID de Triaje",
    pn_peso: "Peso (kg)",
    pn_talla: "Talla (cm)",
    pn_temperatura: "Temperatura (°C)",
    pv_motivo_visita: "Motivo de consulta",

    // pn_presion_arterial: "Presión arterial (mm Hg)",

    pv_presion_sistolica: "Presión sistólica (mm Hg)",
    pv_presion_diastolica: "Presión diastólica (mm Hg)",

    pn_estado: "Estado",
    pv_prioridad: "Prioridad",
    pn_saturacionOxigeno: "Saturación de Oxígeno (%)",
    pn_frecuenciaCardiaca: "Frecuencia Cardiaca (bpm)",
    pn_frecuenciaRespiratoria: "Frecuencia Respiratoria (rpm)",

    pv_nivelConciencia: "Nivel de conciencia",

    pn_glasgow: "Glasglow",
    pn_eyes_open: "Apertura Ocular",
    pn_talking_correctly: "Respuesta Verbal",
    pn_able_to_move_body: "Respuesta Motora",

    pv_nivelDolor: "Evaluación del dolor",
    pv_condicionesPrexistentes: "Condiciones preexistentes",
  };

  const handleSave = async () => {
    const triajeData = {
      pn_id_triaje: dataTriaje.idTriaje,
      pn_peso: dataTriaje.peso,
      pn_talla: dataTriaje.talla,
      pn_temperatura: dataTriaje.temperatura,
      pv_motivo_visita: dataTriaje.motivoVisita,

      // pn_presion_arterial: dataTriaje.presionArterisal,

      pv_presion_sistolica: dataTriaje.presionSistolica,
      pv_presion_diastolica: dataTriaje.presionDiastolica,

      pn_estado: 1,
      pv_prioridad: dataTriaje.prioridad,
      pn_saturacionOxigeno: dataTriaje.saturacionOxigeno,
      pn_frecuenciaCardiaca: dataTriaje.frecuenciaCardiaca,
      pn_frecuenciaRespiratoria: dataTriaje.frecuenciaRespiratoria,

      pv_nivelConciencia: "",

      pn_glasgow: 1,
      pn_eyes_open: dataTriaje.eyesOpen,
      pn_talking_correctly: dataTriaje.talkingCorrectly,
      pn_able_to_move_body: dataTriaje.ableToMoveBody,

      pv_nivelDolor: dataTriaje.nivelDolor,
      pv_condicionesPrexistentes: dataTriaje.condicionesPrexistentes,
    };

    const incompleteFields = [];
    for (let key in triajeData) {
      const value = triajeData[key];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && !value.trim())
      ) {
        // incompleteFields.push(fieldNames[key] || key);
        if (key !== 'pv_nivelConciencia' && key !== 'pn_glasgow') {
          incompleteFields.push(fieldNames[key] || key);
        }
      }
    }

    if (incompleteFields.length > 0) {
      setMissingFields(incompleteFields);
      setMissingFieldsModal(true);
      return;
    }

    try {
      console.log("LA DATA QUE ESTOY SUBIENDO ES: ", triajeData)
      const result = await triajeService.actualizarTriaje(triajeData);

      if (result === 1) {
        setShowModal(true);
      } else {
        alert(
          "Ocurrió un problema al guardar la información. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al guardar el triaje", error);
      alert("Hubo un error al guardar. Por favor, inténtalo de nuevo.");
    }
  };

  
  useEffect(() => {

    setEyesOpen(dataTriaje?.eyesOpen || '');
    setTalkingCorrectly(dataTriaje?.talkingCorrectly || '');
    setAbleToMoveBody(dataTriaje?.ableToMoveBody || '');
  
    const initialGlasgow = calculateGlasgow(
      dataTriaje?.eyesOpen || '',
      dataTriaje?.talkingCorrectly || '',
      dataTriaje?.ableToMoveBody || ''
    );
    setGlasgow(initialGlasgow);
  }, [dataTriaje]);


  const handleAcceptModal = () => {
    setShowModal(false);
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  function handleDolor(value) {
    setDataTriaje((prevState) => ({
      ...prevState,
      nivelDolor: value,
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await triajeService.buscarPorFiltro(params.idTriaje);
        setDataTriaje(data);
        console.log("LA DATA QUE LLEGA ES: ", dataTriaje)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  function getColor(num) {
    if (num.toString() === dataTriaje?.nivelDolor) {
      return "bg-black text-white";
    }
    switch (num) {
      case 1:
        return "bg-red-0";
      case 2:
        return "bg-red-100";
      case 3:
        return "bg-red-200";
      case 4:
        return "bg-red-300";
      case 5:
        return "bg-red-400";
      case 6:
        return "bg-red-500";
      case 7:
        return "bg-red-600";
      case 8:
        return "bg-red-700";
      case 9:
        return "bg-red-800";
      case 10:
        return "bg-red-900";
      default:
        return "bg-red-500";
    }
  }

  const handleAnularTriajeClick = () => {
    setShowConfirmPopup(true);
  };

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleConfirmAnulacion = async () => {
    const triajeDataCancelled = {
      pn_id_triaje: Number(params.idTriaje),
      pn_peso: 0,
      pn_talla: 0,
      pn_temperatura: 0,
      pv_motivo_visita: "-",

      // pn_presion_arterial: 0,

      pv_presion_sistolica: 0,
      pv_presion_diastolica: 0,

      pn_estado: 3,
      pv_prioridad: "N.A.",
      pn_saturacionOxigeno: "0",
      pn_frecuenciaCardiaca: "0",
      pn_frecuenciaRespiratoria: "0",

      pv_nivelConciencia: "-",

      pn_glasgow: "-",
      pn_eyes_open: "-",
      pn_talking_correctly: "-",
      pn_able_to_move_body: "-",

      pv_nivelDolor: "4",
      pv_condicionesPrexistentes: "-",
    };

    try {
      const result = await triajeService.eliminarTriaje(triajeDataCancelled);
      if (result === 1) {
        if (typeof window !== "undefined") {
          window.history.back();
        }
      } else {
        alert(
          "Ocurrió un problema al anular el triaje. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al anular el triaje", error);
      alert(
        "Hubo un error al anular el triaje. Por favor, inténtalo de nuevo."
      );
    }
    setShowConfirmPopup(false);
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const edad = dataTriaje?.paciente
    ? calcularEdad(dataTriaje.paciente.fechaNacimiento)
    : "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("paciente.")) {
      const field = name.split(".")[1];
      setDataTriaje((prevState) => ({
        ...prevState,
        paciente: {
          ...prevState.paciente,
          [field]: value,
        },
      }));
    } else {
      setDataTriaje((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (event.target.name === "motivoVisita") {
      const count = event.target.value.length;
      document.getElementById("charCount").textContent = `${count}/1000`;
    }

    if (event.target.name === "condicionesPrexistentes") {
      const count = event.target.value.length;
      document.getElementById(
        "charCountPreexistentes"
      ).textContent = `${count}/1000`;
    }

    if (name === "eyesOpen") {
      setEyesOpen(value);
    } else if (name === "talkingCorrectly") {
      setTalkingCorrectly(value);
    } else if (name === "ableToMoveBody") {
      setAbleToMoveBody(value);
    }
  };

  return (
    <>
      <div>
        {showConfirmPopup && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75"
                aria-hidden="true"
              ></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Confirmación
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      ¿Está seguro que desea anular el triaje?
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleConfirmAnulacion}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
                  >
                    Sí, anular
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className="mr-2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <section style={{ maxWidth: '100rem' }} className="rounded-lg p-8 mx-auto flex flex-col space-y-6"> */}
        <section className="rounded-lg p-8 mx-auto flex flex-col space-y-6 md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          {/* <div className="flex justify-end ">
            <div className="flex-end">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
                onClick={() => router.back()}
              >
                <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
                Volver
              </button>
            </div>
          </div> */}
          <div className="flex justify-end space-x-4">
            <button
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
              onClick={handleEditClick}
            >
              <i className="fas fa-pencil-alt mr-2"></i> Editar
            </button>
            <button
              className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
              onClick={handleAnularTriajeClick}
            >
              <i className="fas fa-times-circle mr-2"></i>  Anular Triaje
            </button>
          </div>

          <div>
            <h1 style={{ fontSize: "2.2525rem" }} className="font-bold mb-2">
              Información básica
            </h1>
            <div className="flex flex-wrap gap-4">
              <div style={{ flex: "3 0 0%" }}>
                <InputField
                  label="Nombre completo"
                  value={`${dataTriaje?.paciente?.nombres} ${dataTriaje?.paciente?.apellidoPaterno} ${dataTriaje?.paciente?.apellidoMaterno}`}
                  disabled
                  width="w-full"
                  labelWidth="w-full"
                />
              </div>
              <div style={{ flex: "1.2 0 0%" }}>
                <InputField
                  label="Documento de identidad"
                  value={dataTriaje?.paciente?.dni}
                  disabled
                  width="w-full"
                  labelWidth="w-full"
                />
              </div>
              <div style={{ flex: "1 0 0%" }}>
                <InputField
                  label="Sexo"
                  value={
                    dataTriaje?.paciente?.sexo === "F" ? "Femenino" : "Masculino"
                  }
                  disabled
                  width="w-full"
                  labelWidth="w-full"
                />
              </div>
              <div style={{ flex: "0 0 90px" }}>
                <InputField label="Edad" value={edad} disabled width="w-full" />
              </div>
            </div>

            <div className="flex justify-start">
              <div style={{ flex: "0 0 90px", marginRight: "1rem" }}>
                <InputField
                  label="Talla (cm)"
                  value={dataTriaje?.talla}
                  isEditable={isEditable}
                  type="number"
                  name="talla"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>

              <div style={{ flex: "0 0 90px" }}>
                <InputField
                  label="Peso (kg)"
                  value={dataTriaje?.peso}
                  isEditable={isEditable}
                  type="number"
                  name="peso"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>
            </div>

            <div className="col-span-3">
              <h2 className="text-3xl font-bold mb-4 mt-4">Motivo de consulta</h2>
              <InputField
                value={dataTriaje?.motivoVisita}
                isEditable={isEditable}
                type="textarea"
                name="motivoVisita"
                onChange={handleChange}
                maxLength={1000}
              />
              <span className="text-right block" id="charCount">
                {(dataTriaje?.motivoVisita || "").length}/1000
              </span>
            </div>

            <div className="col-span-3">
              <h2 className="text-3xl font-bold mb-4">Signos vitales</h2>
            </div>

            <div className="flex justify-start">
              <div style={{ flex: "0 0 90px", marginRight: "14rem" }}>
                <InputField
                  label="Temperatura (°C)"
                  value={dataTriaje?.temperatura}
                  isEditable={isEditable}
                  type="number"
                  labelWidth="labelWidth"
                  name="temperatura"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>

              <div style={{ flex: "0 0 90px", marginRight: "14rem" }}>
                <InputField
                  label="Frecuencia Cardíaca (lpm)"
                  value={dataTriaje?.frecuenciaCardiaca}
                  isEditable={isEditable}
                  type="number"
                  labelWidth="labelWidth"
                  name="frecuenciaCardiaca"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>

              <div style={{ flex: "0 0 90px" }}>
                <InputField
                  label="Frecuencia Respiratoria (rpm)"
                  value={dataTriaje?.frecuenciaRespiratoria}
                  isEditable={isEditable}
                  type="number"
                  labelWidth="labelWidth"
                  name="frecuenciaRespiratoria"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <div style={{ flex: "0 0 90px", marginRight: "14rem" }}>
                <InputField
                  label="Saturación de Oxígeno (%)"
                  value={dataTriaje?.saturacionOxigeno}
                  isEditable={isEditable}
                  type="number"
                  labelWidth="labelWidth"
                  name="saturacionOxigeno"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>
              <div className="flex items-center justify-start space-x-3">
                <InputField
                  label="Presión Sistólica (mm Hg)"
                  value={dataTriaje?.presionSistolica}
                  isEditable={isEditable}
                  type="number"
                  labelWidth="labelWidth"
                  name="presionSistolica"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />

                <span className="text-4xl mt-8">/</span>

                <InputField
                  label="Presión Diastólica (mm Hg)"
                  value={dataTriaje?.presionDiastolica}
                  isEditable={isEditable}
                  type="number"
                  labelWidth="labelWidth"
                  name="presionDiastolica"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                  pattern="\d*"
                />
              </div>
            </div>

            <div className="col-span-3">
              <h2 className="text-3xl font-bold mb-4 mt-5">
                Nivel de conciencia
              </h2>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex justify-start">
                <div style={{ flex: "0 0 90px", marginRight: "14rem" }}>
                  <InputField
                    label="Apertura Ocular"
                    name="eyesOpen"
                    value={dataTriaje?.eyesOpen}
                    onChange={handleChange}
                    type="select"
                    isEditable={isEditable}
                    labelWidth="labelWidth"
                    options={[
                      { value: "Ninguna", label: "Ninguna" },
                      {
                        value: "Respuesta al Dolor",
                        label: "Respuesta al Dolor",
                      },
                      {
                        value: "Respuesta al Estímulo Verbal",
                        label: "Respuesta al Estímulo Verbal",
                      },
                      { value: "Espontánea", label: "Espontánea" },
                    ]}
                    width="w-full"
                  />
                </div>

                <div style={{ flex: "0 0 90px", marginRight: "14rem" }}>
                  <InputField
                    label="Respuesta Verbal"
                    name="talkingCorrectly"
                    value={dataTriaje?.talkingCorrectly}
                    onChange={handleChange}
                    type="select"
                    isEditable={isEditable}
                    labelWidth="labelWidth"
                    options={[
                      { value: "Ninguna", label: "Ninguna" },
                      {
                        value: "Sonidos Incomprensibles",
                        label: "Sonidos Incomprensibles",
                      },
                      {
                        value: "Palabras Inapropiadas",
                        label: "Palabras Inapropiadas",
                      },
                      { value: "Confuso", label: "Confuso" },
                      { value: "Orientado", label: "Orientado" },
                    ]}
                    width="w-full"
                  />
                </div>

                <div style={{ flex: "0 0 90px" }}>
                  <InputField
                    label="Respuesta Motora"
                    name="ableToMoveBody"
                    value={dataTriaje?.ableToMoveBody}
                    onChange={handleChange}
                    type="select"
                    isEditable={isEditable}
                    labelWidth="labelWidth"
                    options={[
                      { value: "Ninguna", label: "Ninguna" },
                      {
                        value: "Extensión al Dolor",
                        label: "Extensión al Dolor",
                      },
                      { value: "Flexión al Dolor", label: "Flexión al Dolor" },
                      {
                        value: "Retirada del Dolor",
                        label: "Retirada del Dolor",
                      },
                      {
                        value: "Localización del Dolor",
                        label: "Localización del Dolor",
                      },
                      { value: "Obedece Órdenes", label: "Obedece Órdenes" },
                    ]}
                    width="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <InputField
                label="Escala Glasgow"
                value={glasgow}
                disabled
                width="w-1/4"
                labelWidth="w-full"
              />
            </div>

            <div className="col-span-3">
              <h2 className="text-3xl font-bold mb-4 mt-5">Nivel de dolor</h2>
            </div>

            <div className="mt-4">
              <div className="flex justify-start">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    className={`mx-2 py-2 px-4 border rounded focus:outline-none transition-colors ${getColor(
                      num
                    )} ${String(num) === dataTriaje?.nivelDolor
                      ? "bg-black text-white"
                      : ""
                      }`}
                    onClick={() => handleDolor(String(num))}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-3">
              <h4 className="text-3xl font-bold mb-4 mt-8">
                Condiciones preexistentes
              </h4>

              <InputField
                value={dataTriaje?.condicionesPrexistentes}
                isEditable={isEditable}
                type="textarea"
                name="condicionesPrexistentes"
                onChange={handleChange}
                maxLength={1000}
              />
              <span className="text-right block" id="charCountPreexistentes">
                {(dataTriaje?.condicionesPrexistentes || "").length}/1000
              </span>
            </div>

            <div>
              <h4 className="text-3xl font-bold mb-4">Prioridad</h4>

              <InputField
                name="prioridad"
                value={dataTriaje?.prioridad}
                onChange={handleChange}
                type="select"
                isEditable={isEditable}
                placeholder=" "
                options={[
                  { value: "N.A.", label: "Seleccione una opción" },
                  { value: "Resucitacion", label: "🔴 Resucitación" },
                  { value: "Emergencia", label: "🟠 Emergencia" },
                  { value: "Urgencia", label: "🟡 Urgencia" },
                  { value: "Urgencia menor", label: "🟢 Urgencia menor" },
                  { value: "Sin Urgencia", label: "🔵 Sin urgencia" },
                ]}
                width="w-full"
              />
            </div>

            <div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-3 mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-300 mr-4 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    <i className="fas fa-times mr-2"></i>Cancelar
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    <i className="fas fa-save mr-2"></i>Guardar
                  </button>
                </div>
              </div>
            </div>

            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5l-1.41 1.42L9 19.84L21.41 7.41L20 6z"></path>
                  </svg>
                  <p className="text-gray-700 font-semibold">
                    Información guardada exitosamente!
                  </p>
                  <button
                    onClick={handleAcceptModal}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            )}

            {missingFieldsModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-yellow-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                  </svg>
                  <p className="text-gray-700 font-semibold">
                    Por favor, completa los siguientes campos antes de guardar:
                  </p>
                  <ul className="text-gray-600 list-disc pl-5">
                    {missingFields.map((field) => (
                      <li key={field}>{field}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setMissingFieldsModal(false)}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

const InputField = ({
  label,
  name,
  value,
  isEditable,
  type = "text",
  onChange,
  options = [],
  width = "w-full",
  labelWidth,
  placeholder = "Seleccione una opción",
  minWidth = "w-0",
  maxWidth = "w-full",
}) => {
  const inputClass = `border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${width}  ${isEditable ? "bg-white cursor-text" : "bg-gray-300 cursor-not-allowed"
    }`;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            id={name}
            value={value}
            disabled={!isEditable}
            onChange={onChange}
            className={`flex-1 ${inputClass}`}
          />
        );
      case "select":
        console.log(`Current value for ${name}:`, value);
        return (
          <select
            name={name}
            id={name}
            value={value}
            disabled={!isEditable}
            onChange={onChange}
            className={`flex-1 ${inputClass}`}
          >          
            <option value="" disabled selected>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            disabled={!isEditable}
            onChange={onChange}
            className={`flex-1 ${inputClass}`}
            style={{ minWidth: minWidth, maxWidth: maxWidth }}
          />
        );
    }
  };

  return (
    <div className={`mb-2 ${width}`}>
      <label
        className={`block text-lg font-medium text-gray-700 mb-2 ${labelWidth}`}
        htmlFor={name}
      >
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default TriajeProfile;
