"use client"
import DatePicker from "@/components/Date/DatePicker"
import { MdArrowBack } from 'react-icons/md';
import useDoctorData from "@/hooks/useDoctorData"
import { doctorService } from "@/services/doctorService"
import { sexParser } from "@/util/patientParser"
import { parse } from "date-fns"
import { TextInput } from "flowbite-react"
import { useEffect } from "react"
import { toast } from "sonner"
import noPerfil from '../../../../../components/cards/noPerfil.png'
import { data } from "autoprefixer"
import { useRouter } from "next/navigation"
const ModificarDoctor = ({ params }) => {
  const router = useRouter()
  const idDoctor = params.idDoctor
  const { doctorData, setDoctorData } = useDoctorData()

  //Servicio hecho pal pico, te manda un arreglo en vez de solo a un wn
  const fetchDoctorData = async (idDoctor) => {
    try {
      const data = await doctorService.buscarPorNombre(idDoctor)
      const doctor = data[0] //hence this
      console.log(doctor)

      setDoctorData({
        apellidoPaterno: doctor.apellidoPaterno,
        apellidoMaterno: doctor.apellidoMaterno,
        nombres: doctor.nombres,
        dni: doctor.dni,
        fechaNacimiento: doctor.fechaNacimiento,
        sexo: sexParser(doctor.sexo),
        telefono: doctor.telefono,
        correo: doctor.correoElectronico,
        area: doctor.area,
        cmp: doctor.cmp,
        especialidad: doctor.especialidad.nombre,
        fotoPerfil: `data:image/png;base64,${doctor.foto}`

      })

    } catch (error) {
      console.log(error)
      toast.error("Error al buscar los datos del doctor")
    }
  }

  function validarCorreoElectronico(correo) {
    // Patrón para validar dirección de correo electrónico
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    return patronCorreo.test(correo)
  }
  function validarNumeroTelefono(numero) {
    // Patrón para validar número de teléfono (10 dígitos, opcionalmente con guiones, paréntesis y espacios)
    const patronTelefono = /^\d{9}$/

    return patronTelefono.test(numero)
  }

  const putData = async (data) => {
    let hayErrores = false
    if (!validarNumeroTelefono(data.telefono)) {
      toast.error("El número telefónico es incorrecto.")
      hayErrores = true
    }
    if (!validarCorreoElectronico(data.correoElectronico)) {
      toast.error("Por favor, ingrese un correo electrónico válido.")
      hayErrores = true
      console.log(correo)
    }
    if (hayErrores) return

    try {
      await toast.promise(
        async () => {
          // Lógica de carga aquí
          const response = await doctorService.modificarDoctor(data);
          console.log(response);
          router.back();
        },
        {
          loading: 'Guardando cambios...',
          success: 'Cambios guardados exitosamente.',
          error: 'Error al guardar cambios.',
        }
      );
    } catch (error) {
      console.error(error);
      toast.error('Error al realizar la operación.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const partes = doctorData.fotoPerfil.split("data:image/")[1].split(";base64,")
    const base64Data = partes[1]
    const dataToUpdate = {
      idPersona: idDoctor,
      telefono: doctorData.telefono,
      correoElectronico: doctorData.correo,
      foto: base64Data !== "undefined" ? base64Data : null
    };
    putData(dataToUpdate)
  }

  const handleCancel = (e) => {
    toast('¿Cancelar cambios?', {
      action: {
        label: 'Sí',
        onClick: () => {
          // Aquí puedes realizar la lógica de cancelación
          router.back();
        },
      },
      cancel: {
        label: 'No',
        onClick: () => {
          // Aquí puedes realizar la lógica para no cancelar

        },
      },
    });
  }
  const handleImagenChange = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const fileName = file.name
    const fileExtension = fileName.split('.').pop().toLowerCase();;
    if (fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "jpg" || fileExtension === "svg") {
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageData = reader.result
          setDoctorData((prev) => ({
            ...prev,
            fotoPerfil: imageData
          }))
        }
        reader.readAsDataURL(file)
      }
    } else {
      toast.error(`No se permite imagen con extensión .${fileExtension}. Por favor usar imágenes con extensión .jpg, .jpeg, .png o .svg.`)
    }
  }

  useEffect(() => {
    fetchDoctorData(idDoctor)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end ">
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
      </div>
      <h1 className="text-4xl w-full py-10 font-semibold">Modificar datos del doctor</h1>
      <div className="flex ">
        <div className="w-2/3">
          <div className="grid grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="dniMedico" className="text-gray-500">
                DNI
              </label>
              <TextInput
                type="text"
                name="dni"
                id="dni"
                value={doctorData.dni}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                disabled
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                CMP
              </label>

              <TextInput
                type="text"
                name="cmp-doctor"
                id="cmp-doctor"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={doctorData.cmp} //Pendiente: Parsear esto.
                disabled
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Fecha de nacimiento
              </label>

              <TextInput
                type="text"
                name="fecha-nacimiento"
                id="fecha-nacimiento"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={doctorData.fechaNacimiento} //Pendiente: Parsear esto.
                disabled
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Sexo
              </label>

              <TextInput
                type="text"
                name="sexo-doctor"
                id="sexo-doctor"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={doctorData.sexo} //Pendiente: Parsear esto.
                disabled
              />
            </div>


            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Especialidad
              </label>

              <TextInput
                type="text"
                name="especialidad-doctor"
                id="especialidad-doctor"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={doctorData.especialidad} //Pendiente: Parsear esto.
                disabled
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Area
              </label>

              <TextInput
                type="text"
                name="area-doctor"
                id="area-doctor"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={doctorData.area} //Pendiente: Parsear esto.
                disabled
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Correo electrónico
              </label>
              <TextInput
                type="text"
                name="correo"
                minLength={3}
                maxLength={255}
                id="correo"
                autoComplete="off"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={doctorData.correo}
                //PENDIENTE: HANDLE DISABLED PQ AL INICIO NO DEBERIA
                onChange={(event) => setDoctorData((prev) => ({
                  ...prev,
                  correo: event.target.value
                }))}
              />
            </div>


            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Teléfono
              </label>
              <TextInput
                type="text"
                name="telefono"
                minLength={3}
                maxLength={9}
                id="telefono"
                autoComplete="off"
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                placeholder=" "
                value={doctorData.telefono}
                onChange={(event) => setDoctorData((prev) => ({
                  ...prev,
                  telefono: event.target.value
                }))}
                required
              />
            </div>
          </div>
        </div>



        <div className="w-1/3 flex flex-col items-center">
          <label htmlFor="fotoPerfil" className=" text-gray-500 text-3xl font-bold">
            {doctorData.nombres} {doctorData.apellidoPaterno} {doctorData.apellidoMaterno}
          </label>

          <div className="py-10">
            <img
              src={doctorData.fotoPerfil}
              aria-label="Foto de perfil del doctor"
              className="rounded-full w-60 h-60 object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            id="fotoPerfil"
            onChange={handleImagenChange}
            className="block w-fit text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none" // Agregamos mx-auto para centrar horizontalmente
          />
          <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG o JPEG.</p>
        </div>
      </div >

      <div className="flex flex-row-reverse">
        <button
          type="submit"
          className="m-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg w-full sm:w-auto px-5 py-3 text-center"
        >
          Guardar
        </button>
        <button
          type="button"
          className="m-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg  w-full sm:w-auto px-5 py-3 text-center"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default ModificarDoctor