"use client"
import DatePicker from "@/components/Date/DatePicker"
import Picker from "@/components/buttons/Picker"
import { useState, useEffect, use } from "react"
import {
  validateNumberInput,
  validateSecurityCode,
  validateTextInput,
} from "@/util/formValidations"
import SearchPatientModal from "./SearchPatientModal"
import { TextInput } from "flowbite-react"
import { patientService } from "@/services/patientService"
import { sexParser } from "@/util/patientParser"
import Dropdown from "@/components/Dropdowns/Dropdown"
import { toast } from "sonner"
import { differenceInYears, format, parse } from "date-fns"
const PatientForm = ({
  formComplete, setFormComplete,
  setPatientId, patientForm, setPatientForm,
  fechaNacimiento, setFechaNacimiento,
  sexo, setSexo, setLegalResponsibilityForm
}) => {
  const [showModal, setShowModal] = useState(false)
  const [isFormEnabled, setIsFormEnabled] = useState(false)
  const [cancelButton, setCancelButton] = useState(false)
  const [obtainedPatientId, setObtainedPatientId] = useState("")
  const [securityTypes, setSecurityTypes] = useState([])

  const [isDataFromModal, setIsDataFromModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)

  const fetchSecurityTypes = async () => {
    try {
      const data = await patientService.listarSeguros()
      setSecurityTypes(data)
    } catch (error) {
      console.log("No se pudo obtener el listado de seguros")
    }
  }
  //Funcion para ver la edad del paciente
  const verificarMayoriaDeEdad = (fechaNacimiento) => {
    return differenceInYears(new Date(), parse(fechaNacimiento, "yyyy-MM-dd", new Date())) >= 18
  }

  const fetchData = async (filtro) => {
    try {
      const data = await patientService.mostrarPacienteRegistrado(filtro)
      console.log(data.idPersona)
      setPatientForm({
        ...patientForm,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        nombres: data.nombres,
        tipoSeguro: data.tipoSeguro,
        codigoSeguro: data.codigoSeguro,
        dni: data.dni,
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.correo,
      })

      console.log(data.fechaNacimiento)
      const variable = parse(data.fechaNacimiento, 'yyyy-MM-dd', new Date())
      console.log(variable)
      setSelectedDate(variable)
      setFechaNacimiento(data.fechaNacimiento)

      let mayoriaDeEdad = verificarMayoriaDeEdad(data.fechaNacimiento)
      if (mayoriaDeEdad) {
        setLegalResponsibilityForm({
          tieneAcompañante: "No",
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          dni: "",
          parentesco: "",
        })
      } else {
        setLegalResponsibilityForm((prev) => ({
          ...prev,
          tieneAcompañante: "Si",
        }))
      }
      setSexo(sexParser(data.sexo))
      setPatientId({
        idPersona: data.idPersona,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handlePatientSelect = (selectedPatient) => {
    setObtainedPatientId(selectedPatient.idPersona)
    setIsDataFromModal(true) // Para saber si los datos vienen del modal o no
  }
  const handleFechaNacimiento = (newDate) => {
    setSelectedDate(newDate)
    let fechaNacimiento = format(newDate, 'yyyy-MM-dd', new Date())
    setFechaNacimiento(fechaNacimiento)
    let mayoriaDeEdad = verificarMayoriaDeEdad(fechaNacimiento)

    if (mayoriaDeEdad) {
      setLegalResponsibilityForm({
        tieneAcompañante: "No",
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        dni: "",
        parentesco: "",
      })
    } else {
      setLegalResponsibilityForm((prev) => ({
        ...prev,
        tieneAcompañante: "Si",
      }))
    }

  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const clearForm = () => {
    setPatientForm({
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      tipoSeguro: "",
      codigoSeguro: "",
      dni: "",
      direccion: "",
      telefono: "",
      correo: "",
    })

    setSelectedDate(false)
    setFechaNacimiento("")
    setSexo("")
    setIsDataFromModal(false)
    setFormComplete(false)
  }

  const confirmClearForm = () => {
    clearForm()
    setIsFormEnabled(!isFormEnabled)
    setCancelButton(!cancelButton)
  }

  const handleRegister = () => {
    const isFormFilled = Object.values(patientForm).some((value) => value) || fechaNacimiento || sexo

    //Si al traer datos del modal le doy a nuevo paciente.
    if (isFormFilled && isDataFromModal) {
      toast("Este paciente ya existe, ¿deseas crear otro?", {
        action: {
          label: "Si",
          onClick: () => confirmClearForm(),
        },
        cancel: {
          label: "No",
          onClick: () => toast.dismiss(),
        },
      })
      return
    }

    //Si al estar en plena creacion de un paciente, le doy a cancelar
    if (isFormFilled) {
      toast("Los datos ingresados se borraran, ¿esta seguro?", {
        action: {
          label: "Si",
          onClick: () => confirmClearForm(),
        },
        cancel: {
          label: "No",
          onClick: () => toast.dismiss(),
        },
      })
      return
    } else {
      confirmClearForm()
    }
  }

  useEffect(() => {
    fetchSecurityTypes()
    if (obtainedPatientId) {
      fetchData(obtainedPatientId)
    }
  }, [obtainedPatientId])

  return (
    <section id="section1">
      <div className="pb-8 flex justify-between items-center">
        <h2 className="w-full font-bold break-normal text-gray-700 pb-8 text-2xl">
          Información del paciente
        </h2>
        <div className="flex w-full flex-row-reverse">
          <button
            type="button"
            onClick={handleRegister}
            className={`m-2 text-white ${cancelButton
              ? "bg-red-600 hover:bg-red-700"
              : "bg-orange-500 hover:bg-orange-600"
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center`}
          >
            {cancelButton ? "Cancelar" : "Nuevo paciente"}
          </button>
          <button
            type="button"
            disabled={isFormEnabled}
            onClick={handleOpenModal}
            className={`m-2 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center 
                        ${isFormEnabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} 
                        ${isFormEnabled ? "text-gray-700" : ""}`}
          >
            Buscar paciente
          </button>
        </div>

        <SearchPatientModal
          show={showModal}
          onClose={handleCloseModal}
          onSelect={handlePatientSelect}
        />
      </div>

      <fieldset disabled={!isFormEnabled || formComplete}>
        <div className="grid grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="first_last_name"
              id="first_last_name"
              minLength={3}
              maxLength={255}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
              placeholder=""
              value={patientForm.apellidoPaterno}
              onChange={(event) => {
                validateTextInput(event.target)
                setPatientForm({
                  ...patientForm,
                  apellidoPaterno: event.target.value,
                })
              }}
              required
            />
            <label
              htmlFor="first_last_name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Apellido paterno
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="second_last_name"
              id="second_last_name"
              minLength={3}
              maxLength={255}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
              placeholder=" "
              value={patientForm.apellidoMaterno}
              onChange={(event) => {
                validateTextInput(event.target)
                setPatientForm({
                  ...patientForm,
                  apellidoMaterno: event.target.value,
                })
              }}
              required
            />
            <label
              htmlFor="second_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
            >
              Apellido materno
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <TextInput
            type="text"
            name="names"
            id="names"
            minLength={3}
            maxLength={255}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
            placeholder=" "
            value={patientForm.nombres}
            onChange={(event) => {
              validateTextInput(event.target)
              setPatientForm({
                ...patientForm,
                nombres: event.target.value,
              })
            }}
            required
          />
          <label
            htmlFor="names"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombres
          </label>
        </div>

        <div className="grid grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <Dropdown
              data={securityTypes}
              name={"dropdown-tipo-seguro"}
              defaultText={"Elegir un tipo de seguro"}
              text={"descripcion"}
              defaultValue={""}
              width={"w-fit"}
              value={"descripcion"}
              selectedValue={patientForm.tipoSeguro}
              handleChange={(event) => {
                setPatientForm({
                  ...patientForm,
                  tipoSeguro: event.target.value,
                })
              }}
            />
            <label
              htmlFor="dropdown-tipo-seguro"
              className="peer-focus:font-medium absolute text-sm  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tipo seguro
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="security_number"
              id="security_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
              placeholder=" "
              minLength={3}
              maxLength={6}
              value={patientForm.codigoSeguro}
              onChange={(event) => {
                validateSecurityCode(event.target)
                setPatientForm({
                  ...patientForm,
                  codigoSeguro: event.target.value,
                })
              }}
              required
            />
            <label
              htmlFor="security_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Codigo seguro
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="dni"
              id="dni"
              minLength={3}
              maxLength={8}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
              placeholder=" "
              value={patientForm.dni}
              onChange={(event) => {
                validateNumberInput(event.target)
                setPatientForm({
                  ...patientForm,
                  dni: event.target.value,
                })
              }}
              required
            />
            <label
              htmlFor="dni"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DNI
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="address"
              id="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
              placeholder=" "
              autoComplete="off"
              value={patientForm.direccion}
              onChange={(event) =>
                setPatientForm({
                  ...patientForm,
                  direccion: event.target.value,
                })
              }
              required
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 "
            >
              {"Direccion"}
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="phone"
              minLength={3}
              maxLength={9}
              id="phone"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
              placeholder=" "
              value={patientForm.telefono}
              onChange={(event) => {
                validateNumberInput(event.target)
                setPatientForm({
                  ...patientForm,
                  telefono: event.target.value,
                })
              }}
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] "
            >
              Telefono
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              type="text"
              name="email"
              minLength={3}
              maxLength={255}
              id="email"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
              placeholder=" "
              value={patientForm.correo}
              onChange={(event) => {
                setPatientForm({
                  ...patientForm,
                  correo: event.target.value,
                })
              }}
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] "
            >
              Correo
            </label>
          </div>
        </div>



        <div className="grid grid-cols-2 md:gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha-nacimiento">
              Fecha de nacimiento
            </label>
            <DatePicker
              name={"fecha-nacimiento"}
              selectedDate={selectedDate}
              setSelectedDate={handleFechaNacimiento}
            />
          </div>
          <Picker
            name1={"masculino"}
            name2={"femenino"}
            text={"Elegir genero:"}
            option1={"Masculino"}
            option2={"Femenino"}
            value={sexo}
            setValue={setSexo}
          />
        </div>
      </fieldset>
    </section>
  )
}

export default PatientForm
