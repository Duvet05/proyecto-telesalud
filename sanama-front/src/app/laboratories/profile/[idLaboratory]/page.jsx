"use client";
import { useEffect, useState, useRef } from "react";
import { laboratoryService } from "@/services/laboratoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";
import { MdArrowBack } from 'react-icons/md';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LaboratoryProfile = ({ params }) => {
  const router = useRouter();
  const [medicos, setMedicos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleAddExamenClick = () => {
    setDataLaboratory((prevState) => {
      const lastId =
        prevState.examenMedico.length > 0
          ? Math.max(...prevState.examenMedico.map((e) => e.idExamen || 0))
          : 0;

      return {
        ...prevState,
        examenMedico: [
          ...prevState.examenMedico,
          { idExamen: lastId + 1, nombreArchivo: "", archivo: null },
        ],
      };
    });

    setTimeout(() => {
      const newExamenIndex = dataLaboratory.examenMedico.length;
      const newFileInput = document.querySelector(
        `input[name="examenMedico.${newExamenIndex}.archivo"]`
      );
      if (newFileInput) {
        newFileInput.click();
      }
    }, 0);
  };

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response =
          await laboratoryService.listarMedicosLaboratorioValidado();
        setMedicos(response);
      } catch (error) {
        console.error("Error al obtener los médicos", error);
      }
    };

    fetchMedicos();
  }, []);

  const [dataLaboratory, setDataLaboratory] = useState({
    idOrdenLaboratorio: null,
    codigoOrden: "",
    tipoMuestra: "",
    instrucciones: "",
    doctorFirmante: "",
    observaciones: "",
    citaMedica: {
      paciente: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        dni: "",
        fechaNacimiento: "",
        sexo: "",
      },
      medico: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    },
    examenMedico: [
      {
        idExamen: null,
        nombreArchivo: "",
        archivo: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await laboratoryService.buscarOrdenLaboratorioPorId(
          params.idLaboratory
        );
        console.log(data);
        setDataLaboratory(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("citaMedica.paciente.")) {
      const field = name.split(".")[2];
      setDataLaboratory((prevState) => ({
        ...prevState,
        citaMedica: {
          ...prevState.citaMedica,
          paciente: {
            ...prevState.citaMedica.paciente,
            [field]: value,
          },
        },
      }));
    } else if (name.includes("citaMedica.medico.")) {
      const field = name.split(".")[2];
      setDataLaboratory((prevState) => ({
        ...prevState,
        citaMedica: {
          ...prevState.citaMedica,
          medico: {
            ...prevState.citaMedica.medico,
            [field]: value,
          },
        },
      }));
    } else {
      setDataLaboratory((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (name === "instrucciones" || name === "observaciones") {
      const count = value.length;
      document.getElementById("charCount").textContent = `${count}/1000`;
    }
  };

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const [missingFieldsModal, setMissingFieldsModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fieldNames = {
    idOrdenLaboratorio: "ID de la Orden de Laboratorio",
    doctorFirmante: "Médico de laboratorio",
    estado: "Estado",
    examenMedico: "Examen Médico",
    observaciones: "Observaciones del Examen",
  };

  const handleSave = async () => {
    const laboratorioData = {
      idOrdenLaboratorio: params.idLaboratory,
      doctorFirmante: dataLaboratory.doctorFirmante,
      estado: 1,
      examenMedico: dataLaboratory.examenMedico,
      observaciones: dataLaboratory.observaciones,
    };

    console.log("los examenes son: ", dataLaboratory.examenMedico);

    const incompleteFields = [];
    for (let key in laboratorioData) {
      const value = laboratorioData[key];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && !value.trim())
      ) {
        incompleteFields.push(fieldNames[key] || key);
      }
    }

    if (incompleteFields.length > 0) {
      setMissingFields(incompleteFields);
      setMissingFieldsModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const result = await laboratoryService.atenderOrdenLaboratorio(
        laboratorioData
      );

      if (result === 1) {
        setShowModal(true);
      } else {
        alert(
          "Ocurrió un problema al guardar la información. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al guardar la orden de laboratorio", error);
      alert("Hubo un error al guardar. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  function getSexoLabel(sexo) {
    if (sexo === "M") {
      return "Masculino";
    } else if (sexo === "F") {
      return "Femenino";
    }
    return ""; 
  }

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

  const handleMedicoChange = (event) => {
    const selectedMedicoId = Number(event.target.value);
    console.log("Selected Medico ID:", selectedMedicoId);

    const selectedMedico = medicos.find(
      (medico) => medico.idValue === selectedMedicoId
    );
    console.log("Selected Medico:", selectedMedico);

    setDataLaboratory((prevData) => {
      return {
        ...prevData,
        doctorFirmante: selectedMedico ? selectedMedico.descripcion : "",
      };
    });
  };

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleAnularLaboratoryClick = () => {
    setShowConfirmPopup(true);
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const handleConfirmAnulacion = async () => {
    const laboratorioDataCancelled = {
      idOrdenLaboratorio: Number(params.idLaboratory),
      doctorFirmante: "Doctor por defecto",
      estado: 3,
      examenMedico: [],
      observaciones: "Anulado",
    };

    try {
      console.log("Datos antes de anular:", laboratorioDataCancelled);
      const result = await laboratoryService.atenderOrdenLaboratorio(
        laboratorioDataCancelled
      );
      console.log("Resultado después de intentar anular:", result);

      if (result === 1) {
        if (typeof window !== "undefined") {
          window.history.back();
        }
      } else {
        alert(
          "Ocurrió un problema al anular la orden de laboratorio. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al anular la orden de laboratorio", error);
      alert(
        "Hubo un error al anular la orden de laboratorio. Por favor, inténtalo de nuevo."
      );
    }
    setShowConfirmPopup(false);
  };

  const handleAcceptModal = () => {
    setShowModal(false);
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          const base64 = reader.result.split(",")[1];
          console.log("EL CUERPO ES", base64),
            setDataLaboratory((prevState) => {
              const updatedExamenMedico = [...prevState.examenMedico];
              updatedExamenMedico[index] = {
                ...updatedExamenMedico[index],
                nombreArchivo: file.name,
                archivo: base64,
              };
              return {
                ...prevState,
                examenMedico: updatedExamenMedico,
              };
            });
        }
      };
    } else {
      console.error("Archivo no permitido o no es un PDF.");
    }
  };

  const handleRemoveExamen = (indexToRemove) => {
    setDataLaboratory((prevState) => ({
      ...prevState,
      examenMedico: prevState.examenMedico.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleAddExamen = (event) => {
    const files = event.target.files;

    if (!files.length) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDataLaboratory((prevState) => {
        const lastId =
          prevState.examenMedico.length > 0
            ? Math.max(...prevState.examenMedico.map((e) => e.idExamen || 0))
            : 0;
        return {
          ...prevState,
          examenMedico: [
            ...prevState.examenMedico,
            {
              idExamen: lastId + 1,
              nombreArchivo: file.name,
              archivo: reader.result,
            },
          ],
        };
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const downloadFile = (base64, fileName) => {
    const blob = base64ToBlob(base64, "application/pdf");

    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mimeType });
  };

  return (
    <div className="w-full p-10 rounded-lg shadow-md">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <div className="animate-spin w-6 h-6 border-t-4 border-blue-500 rounded-full"></div>
            <div className="mt-2 text-gray-600">Cargando...</div>
          </div>
        </div>
      )}

      <section className="rounded-lg p-8 mx-auto flex flex-col space-y-6 md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">

      {/* <div className="flex justify-end">
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
          onClick={handleAnularLaboratoryClick}
        >
          <i className="fas fa-times-circle mr-2"></i>  Anular Laboratorio
        </button>
      </div>

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
                    ¿Está seguro que desea anular el laboratorio?
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

        
        <h4 style={{ fontSize: "2.2525rem" }}  className="text-2xl font-bold">
          Información del paciente
        </h4>

        <div className="flex flex-wrap gap-4">
          <div style={{ flex: "3 0 0%" }}>
            <InputField
              label="Nombre completo"
              value={`${dataLaboratory?.citaMedica?.paciente?.nombres} ${dataLaboratory?.citaMedica?.paciente?.apellidoPaterno} ${dataLaboratory?.citaMedica?.paciente?.apellidoMaterno}`}
              disabled
              width="w-full"
              labelWidth="w-full"
            />
          </div>
          <div style={{ flex: "1.2 0 0%" }}>
            <InputField
              label="Documento de identidad"
              value={dataLaboratory?.citaMedica?.paciente?.dni}
              disabled
              width="w-full"
              labelWidth="w-full"
            />
          </div>
          <div style={{ flex: "1 0 0%" }}>
            <InputField
              label="Sexo"
              value={dataLaboratory?.paciente?.sexo === "F" ? "Femenino" : "Masculino"}
              disabled
              width="w-full"
              labelWidth="w-full"
            />
          </div>
          <div style={{ flex: "0 0 90px" }}>
            <InputField
              label="Edad"
              value={calcularEdad(dataLaboratory?.citaMedica?.paciente?.fechaNacimiento)}
              disabled
              width="w-full"
            />
          </div>
        </div>

        <div className="col-span-3">
          <h2 className="text-3xl font-bold mt-5">Información de orden de laboratorio</h2>
        </div>

        
        <div className="flex justify-start">
          <div style={{ flex: "0 0 150px", marginRight: "1rem" }}>
            <InputField
              label="Tipo de muestra"
              value={dataLaboratory?.tipoMuestra}
              disabled
              width="w-full"
              labelWidth="w-full"
            />
          </div>
          <div style={{ flex: "0 0 390px" }}>
            <InputField
              label="Médico prescriptor"
              value={`${dataLaboratory?.citaMedica?.medico?.nombres} ${dataLaboratory?.citaMedica?.medico?.apellidoPaterno} ${dataLaboratory?.citaMedica?.medico?.apellidoMaterno}`}
              disabled
              width="w-full"
              labelWidth="w-full"
            />
          </div>
        </div>

        <div className="flex">
            <div className="flex-1 col-span-3">
              <InputField
                label="Examenes a realizar"
                value={dataLaboratory?.instrucciones}
                disabled
                type="textarea"
                width="w-full"
                labelWidth="w-full"
              />
            </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mt-5">Información de los exámenes</h2>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="flex justify-start">
            <div style={{ flex: "0 0 350px", marginRight: "14rem" }}>
              <InputField
                label="Médico de Laboratorio"
                name="medicoLaboratorio"
                value={
                  medicos.find(
                    (medico) => medico.descripcion === dataLaboratory.doctorFirmante
                  )?.idValue || ""
                }
                type="select"
                onChange={handleMedicoChange}
                options={medicos.map(medico => ({ value: medico.idValue, label: medico.descripcion }))}
                isEditable={isEditable} 
                labelWidth="w-full"
                width="w-full"
              />
            </div>
          </div>

          <div className="col-span-3">

            <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 tracking-wider">
                    Nombre del archivo
                  </th>
                  <th className="px-6 py-3 text-right text-lg font-medium text-gray-700 tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {dataLaboratory.examenMedico.map((examen, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {examen.nombreArchivo ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              downloadFile(
                                examen.archivo,
                                examen.nombreArchivo
                              );
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            {examen.nombreArchivo}
                          </a>
                        ) : (
                          <input
                            name={`examenMedico.${index}.archivo`}
                            className="border rounded p-2 text-md"
                            type="file"
                            onChange={(e) => handleFileChange(e, index)}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          downloadFile(examen.archivo, examen.nombreArchivo)
                        }
                        className="text-lg text-indigo-600 hover:text-indigo-900"
                      >
                        Descargar
                      </button>
                      <button
                        onClick={() => handleRemoveExamen(index)}
                        className="text-lg text-red-600 hover:text-red-900 ml-4"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <input
                type="file"
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={handleAddExamen}
              />
              
              {/* <button
                onClick={handleAddExamenClick}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center text-xl"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Añadir
              </button> */}
                <button
                  onClick={handleAddExamenClick}
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-4 rounded"
                >
                  <i className="fas fa-plus mr-2"></i> Añadir
                </button>

            </div>
          </div>

            <div className="col-span-3">
              <h2 className="text-3xl font-bold mb-4">Observaciones</h2>
              <InputField
                value={dataLaboratory?.observaciones}
                isEditable={isEditable}
                type="textarea"
                name="observaciones"
                onChange={handleChange}
                maxLength={1000}
              />
              <span className="text-right block" id="charCountObservaciones">
                {(dataLaboratory?.observaciones || "").length}/1000
              </span>
            </div>
        </div>

        <div>
          <div className="grid grid-cols-3">
            <div className="col-span-3 flex justify-end">
              <button
                className="bg-gray-600 text-white hover:bg-blue-600 px-4 py-2 rounded mr-4"
                onClick={handleCancel}
              >
                <i className="fas fa-times mr-2"></i>Cancelar
              </button>
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
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
              {/* Icono de check en SVG */}
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
              {/* Icono de advertencia en SVG */}
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
      </section>
    </div>
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
    <div className={`${width}`}>
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


export default LaboratoryProfile;
