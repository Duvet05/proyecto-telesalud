import Picker from "@/components/buttons/Picker"
import { useEffect, useState } from "react"
import ScheduleChip from "./ScheduleChip"
import { TextInput } from "flowbite-react"
import { format } from "date-fns"
import Calendar from "@/components/Calendar"
import Dropdown from "@/components/Dropdowns/Dropdown"
import { doctorService } from "@/services/doctorService"
import { parseDoctorsDropdown } from "@/util/doctorParser"
import PickerHider from "@/components/buttons/PickerHider"
import { patientService } from "@/services/patientService"
import {
  formatHour,
  validateNumberInput,
  validateTextInput,
} from "@/util/formValidations"

const AppointementForm = ({
  legalResponsibilityForm,
  setLegalResponsibilityForm,
  setDoctorId,
  schedule,
  setSchedule,
  triageRequirement,
  setTriageRequirement,
}) => {


  //Seccion 2
  const [relationships, setRelationships] = useState([])

  //Seccion 3
  const [specialties, setSpecialties] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [availableHours, setAvailableHours] = useState([])
  const [selectedHour, setSelectedHour] = useState(null)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    fetchSpecialty()
    fetchRelationships()
  }, [])

  const fetchSpecialty = async () => {
    try {
      const data = await doctorService.listarEspecialidades()
      setSpecialties(data)
    } catch (error) {
      console.log("No se pudo obtener el listado de especialidades")
    }
  }

  const fetchDoctors = async (filtro, especialidad) => {
    try {
      const data = await doctorService.buscarPorMedicoEspecialidad(
        filtro,
        especialidad
      )
      const drop = parseDoctorsDropdown(data)
      setDoctors(drop)
    } catch (error) {
      console.log(
        "No se pudo obtener el listado de medicos para esta especialidad"
      )
    }
  }

  const fetchAvailableHours = async (date, doctorId) => {
    try {
      const data = await doctorService.buscarHorariosMedicoFecha(
        date,
        doctorId
      )
      setAvailableHours(data)
    } catch (error) {
      console.log(
        "No se pudo obtener el listado de medicos para esta especialidad"
      )
    }
  }

  const fetchRelationships = async () => {
    try {
      const data = await patientService.listarParentescos()
      setRelationships(data)
    } catch (error) {
      console.log("No se pudo obtener el listado de parentescos")
    }
  }



  const handleSpecialityChange = (e) => {
    document.getElementById("dropdown-doctor").value = ""
    setDisabled(true)
    setAvailableHours([])
    setSelectedHour(null)
    setSelectedDate(null)
    fetchDoctors("", e.target.value)
  }

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value
    setDoctorId({
      idPersona: selectedDoctorId,
    })
    setAvailableHours([])
    setSelectedHour(null)
    setSelectedDate(null)
    if (e.target.value === "") {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const handleDateClick = (date) => () => {
    setSelectedDate(date)
    setSelectedHour(null)
    setSchedule({ ...schedule, fecha: format(date, "yyyy-MM-dd") })
    const selectedDoctor = document.getElementById("dropdown-doctor").value
    fetchAvailableHours(format(date, "yyyy-MM-dd"), selectedDoctor)
  }

  const handleHourSelect = (hour) => {
    setSelectedHour(hour)
    setSchedule({ ...schedule, hora: hour })
  }

  const handleResponsibilityChange = (option) => {
    if (option === "No") {
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
        tieneAcompañante: option,
      }))
    }
  }

  return (
    <fieldset>
      <section id="section2" className="pt-10">
        <h2 className="w-full font-bold break-normal text-gray-700  pb-8 text-2xl">
          Revision de responsabilidad legal
        </h2>
        <PickerHider
          text={"¿El paciente tiene algún responsable legal?"}
          option1={"Si"}
          option2={"No"}
          onOptionSelected={handleResponsibilityChange}
          optionSelected={legalResponsibilityForm.tieneAcompañante}
        />

        {legalResponsibilityForm.tieneAcompañante === "Si" ? (
          <>
            <div className="grid grid-cols-2 ">
              <div className="relative z-0 w-full pr-6 mb-6 group">
                <TextInput
                  type="text"
                  name="r_first_name"
                  id="r_first_name"
                  value={legalResponsibilityForm.apellidoPaterno}
                  onChange={(event) => {
                    validateTextInput(event.target)
                    setLegalResponsibilityForm((prev) => ({
                      ...prev,
                      apellidoPaterno: event.target.value,
                    }))
                  }}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="r_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Apellido paterno
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <TextInput
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  value={legalResponsibilityForm.apellidoMaterno}
                  onChange={(event) => {
                    validateTextInput(event.target)
                    setLegalResponsibilityForm((prev) => ({
                      ...prev,
                      apellidoMaterno: event.target.value,
                    }))
                  }}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Apellido materno
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <TextInput
                type="text"
                name="floating_name"
                id="floating_name"
                value={legalResponsibilityForm.nombres}
                onChange={(event) => {
                  validateTextInput(event.target)
                  setLegalResponsibilityForm((prev) => ({
                    ...prev,
                    nombres: event.target.value,
                  }))
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none   "
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombres
              </label>
            </div>

            <div className="grid grid-cols-2 items-center">
              <div className="relative z-0 w-full mb-6 pr-6 group">
                <TextInput
                  type="text"
                  name="floating_dni"
                  id="floating_dni"
                  maxLength={8}
                  minLength={8}
                  value={legalResponsibilityForm.dni}
                  onChange={(event) => {
                    validateNumberInput(event.target)
                    setLegalResponsibilityForm((prev) => ({
                      ...prev,
                      dni: event.target.value,
                    }))
                  }}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none   "
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_dni"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  DNI
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <Dropdown
                  data={relationships}
                  name={"dropdown-parentesco"}
                  defaultText={"Elegir la relacion con el paciente"}
                  text={"descripcion"}
                  defaultValue={""}
                  width={"w-fit"}
                  value={legalResponsibilityForm.parentesco}
                  handleChange={(event) => {
                    setLegalResponsibilityForm((prev) => ({
                      ...prev,
                      parentesco: event.target.value,
                    }))
                  }}
                />
                <label
                  htmlFor="floating_relationship"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Parentesco
                </label>
              </div>
            </div>
          </>
        ) : null}

        {/* Error por si no desea un acompañante siendo menor de edad */}
        <label>

        </label>
      </section>

      <section id="section3" className="py-10">
        <h2 className="font-sans font-bold break-normal text-gray-700 mb-4 text-2xl">
          Medicos y horarios disponibles
        </h2>
        <div className="flex">
          <div>
            <Dropdown
              data={specialties}
              name={"dropdown-specialty"}
              defaultText={"Selecciona una especialidad"}
              text={"nombre"}
              defaultValue={""}
              value={"nombre"}
              width={"w-[500px]"}
              handleChange={handleSpecialityChange}
            />

            <Dropdown
              data={doctors}
              name={"dropdown-doctor"}
              defaultText={"Selecciona un medico"}
              text={"nombreCompleto"}
              defaultValue={""}
              value={"idPersona"}
              width={"w-[500px]"}
              handleChange={handleDoctorChange}
            />

            <div className="flex flex-auto ">
              <Calendar
                selectedDate={selectedDate}
                handleDateClick={handleDateClick}
                disabled={disabled}
              ></Calendar>
            </div>
          </div>
          <div className="flex flex-wrap place-content-around pl-10">
            {availableHours.map((hour, index) => (
              <ScheduleChip
                key={index}
                start={formatHour(hour.horaInicio)}
                isSelected={selectedHour === hour.horaInicio}
                onSelect={() => handleHourSelect(hour.horaInicio)}
              />
            ))}
          </div>
        </div>
        <div className="pt-3 pr-3">
          <label
            htmlFor="fechaSeleccionada"
            className="font-sans font-semibold break-normal text-gray-700 mb-4"
          >
            Reservar a las:
          </label>
          <TextInput
            type="text"
            name="fechaSeleccionada"
            className=" bg-transparent"
            id="fechaSeleccionada"
            value={`${selectedDate !== null ? format(selectedDate, "dd/MM/yyyy") : ""
              } a las ${selectedHour !== null ? selectedHour.substring(0, 5) : "..."
              }`}
            disabled
          />
        </div>
      </section>

      <section id="section-4" className="pb-10">
        <h2 className="w-full font-bold break-normal text-gray-700  pb-8 text-2xl">
          Derivación Previa a triaje{" "}
        </h2>
        <Picker
          name1={"sitriaje"}
          name2={"notriaje"}
          text={"¿El paciente necesita triaje?"}
          option1={"Si"}
          option2={"No"}
          value={triageRequirement}
          setValue={setTriageRequirement}
        ></Picker>
      </section>
    </fieldset>
  )
}

export default AppointementForm
