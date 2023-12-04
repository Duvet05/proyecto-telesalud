"use client"
import React, { useEffect, useState } from 'react'
import { TextInput } from "flowbite-react"
import DatePicker from "@/components/Date/DatePicker"
import Picker from "@/components/buttons/Picker"
import Dropdown from "@/components/Dropdowns/Dropdown"
import { doctorService } from '@/services/doctorService'
import { es } from 'date-fns/locale'
import swal from "sweetalert"
import { useRouter } from "next/navigation"
import { toast, Toaster } from 'sonner'
import { MdArrowBack } from 'react-icons/md';
import { format } from "date-fns"
const NewDoctor = () => {
  const router = useRouter()
  const [imagenPerfil, setImagenPerfil] = useState(null)
  // Estados para campos del médico
  const [nombreMedico, setNombreMedico] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [dni, setDni] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [sexo, setSexo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [area, setArea] = useState('')
  const [cmp, setCmp] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [especialidades, setEspecialidades] = useState([])
  const fetchSpecialty = async () => {
    try {
      const data = await doctorService.listarEspecialidades()
      setEspecialidades(data)
    } catch (error) {
      console.log("No se pudo obtener el listado de especialidades")
    }
  }

  useEffect(() => {
    fetchSpecialty()
  }, [])

  const handleImagenChange = (event) => {

    const file = event.target.files[0]
    // Obtener el nombre del archivo
    const fileName = file.name
    // Obtener la extensión del archivo
    const fileExtension = fileName.split('.').pop().toLowerCase();;
    if (fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "jpg") {

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagenPerfil(reader.result)
        }
        reader.readAsDataURL(file)
      }
    } else {
      toast.error(`No se permite imagen con extensión .${fileExtension}. Por favor usar imágenes con extensión .jpg, .jpeg o .png.`)
    }

  }

  const handleFechaNacimiento = (newDate) => {

    const fechaFormateada = `${fechaNacimiento.getFullYear()}-${String(fechaNacimiento.getMonth() + 1).padStart(2, '0')}-${String(fechaNacimiento.getDate()).padStart(2, '0')}`;
    setFechaNacimiento(fechaFormateada)
  }
  function validarCMP(numero) {
    // Expresión regular que verifica si el número consiste en exactamente 6 dígitos
    const regex = /^\d{6}$/;

    // Verificar si el número coincide con la expresión regular
    return regex.test(numero);
  }
  function validarDNI(numero) {
    // Expresión regular que verifica si el número consiste en exactamente 6 dígitos
    const regex = /^\d{8}$/;

    // Verificar si el número coincide con la expresión regular
    return regex.test(numero);
  }
  function handleCancel() {
    toast('¿Cancelar registro de nuevo médico/a?', {
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
  function validateNumberInput(input) {
    const inputValue = input.value;
    const regex = /^[0-9]*$/; // Expresión regular que solo permite dígitos

    if (!regex.test(inputValue)) {
      // Si la entrada no es un número, eliminar el último caracter ingresado
      input.value = inputValue.slice(0, -1);
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
  const handleSave = () => {
    let hayErrores = false
    if (nombreMedico === "") {
      toast.error("Campo incompleto: Nombres", { duration: 3000 })
      hayErrores = true
    }
    if (apellidoPaterno === "") {
      toast.error("Campo incompleto: Primer apellido", { duration: 3000 })
      hayErrores = true
    }

    if (!validarDNI(dni)) {
      toast.error("Campo incorrecto. DNI debe tener 8 dígitos", { duration: 3000 })
      hayErrores = true
    }

    if (!validarCMP(cmp)) {
      toast.error("Campo incorrecto. CMP debe tener 6 dígitos", { duration: 3000 })
      hayErrores = true
    }

    if (fechaNacimiento === "") {
      toast.error("Campo no seleccionado. Seleccione su fecha de nacimiento", { duration: 3000 })
      hayErrores = true
    }
    if (!validarCorreoElectronico(correo)) {
      toast.error("Campo incorrecto. Correo debe estar en formato ejemplo@aaa.aaa", { duration: 3000 })
      hayErrores = true
    }

    if (!validarNumeroTelefono(telefono)) {
      toast.error("Campo incorrecto. Teléfono debe tener 9 dígitos", { duration: 3000 })
      hayErrores = true
    }

    if (area === "") {
      toast.error("Campo no seleccionado. Area sin seleccionar", { duration: 3000 })
      hayErrores = true
    }

    if (especialidad === "") {
      toast.error("Campo no seleccionado. Especialidad sin seleccionar", { duration: 3000 })
      hayErrores = true
    }

    if (sexo === "") {
      toast.error("Campo no seleccionado. Sexo sin seleccionar", { duration: 3000 })
      hayErrores = true
    }

    if (hayErrores) return
    swal({
      title: "Confirmar",
      text: "¿Confirmar registro de nuevo médico?",
      icon: "warning",
      buttons: ["No", "Sí"],
      showLoaderOnConfirm: true,
    }).then((respuesta) => {
      if (respuesta) {
        swal({
          title: "Espere...",
          buttons: {
            confirm: null,
            cancel: null,
          },
          closeOnClickOutside: false,
          closeOnEsc: false,
        })


        let partes
        let extension
        let base64Data

        if (imagenPerfil != null) {
          partes = imagenPerfil.split("data:image/")[1].split(";base64,")
          extension = partes[0] // Aquí obtendrás la extensión de la imagen (por ejemplo, 'jpeg', 'png', etc.)
          base64Data = partes[1]
        } else {
          base64Data = null;
        }

        // const url = 'http://localhost:8080/rrhh/post/registrarMedico'
        // const fechaFormateada = `${fechaNacimiento.getFullYear()}-${String(fechaNacimiento.getMonth() + 1).padStart(2, '0')}-${String(fechaNacimiento.getDate()).padStart(2, '0')}`;
        // const data = {
        //   nombres: nombreMedico,
        //   apellidoPaterno: apellidoPaterno,
        //   apellidoMaterno: apellidoMaterno,
        //   dni: dni,
        //   fechaNacimiento: fechaFormateada,
        //   sexo: sexo,
        //   telefono: telefono,
        //   correoElectronico: correo,
        //   area: area,
        //   cmp: cmp,
        //   especialidad: {
        //     idEspecialidad: especialidad, // Cambia esto según el valor correcto
        //   },
        //   foto: base64Data, // Puedes manejar la lógica para la foto aquí si es necesario
        // }
        // if (sexo.toLowerCase() === 'masculino') {
        //   // Si la cadena es "Masculino", guarda "M"
        //   data.sexo = 'M'
        // } else if (sexo.toLowerCase() === 'femenino') {
        //   // Si la cadena es "Femenino", guarda "F"
        //   data.sexo = 'F'
        // }
        // console.log("e", data)
        // fetch(url, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error('Network response was not ok');
        //     }
        //     return response.json(); // Agregar esta línea para extraer la respuesta JSON
        //   })
        //   .then(responseData => {
        //     // Manejar la respuesta del servidor si es necesario
        //     console.log('Respuesta del servidor:', responseData);
        //     swal.close();
        //     if (responseData >= 0) {
        //       swal({ text: "El registro se realizó con éxito", icon: "success", timer: "2500" });

        //     } else {
        //       if (responseData == -1) {
        //         toast.error("El CMP ya existe en el sistema", { duration: 3000 })
        //       } else {
        //         if (responseData == -2) {
        //           toast.error("El DNI ya existe en el sistema", { duration: 3000 })
        //         }
        //       }
        //     }
        //     // Puedes realizar otras acciones o redireccionar aquí según la respuesta del servidor
        //     // router.push('/doctors');
        //   })
        //   .catch(error => {
        //     // Manejar errores de la red u otros errores
        //     console.error('Error al enviar los datos:', error);
        //   });

        const enviarDatosMedico = async (nombreMedico, apellidoPaterno, apellidoMaterno, dni, fechaNacimiento, sexo, telefono, correo, area, cmp, especialidad, base64Data) => {
          const fechaFormateada = `${fechaNacimiento.getFullYear()}-${String(fechaNacimiento.getMonth() + 1).padStart(2, '0')}-${String(fechaNacimiento.getDate()).padStart(2, '0')}`;
          let sexoFormateado = sexo.toLowerCase() === 'masculino' ? 'M' : sexo.toLowerCase() === 'femenino' ? 'F' : sexo;
          const doctorData = {
            nombres: nombreMedico,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            dni: dni,
            fechaNacimiento: fechaFormateada,
            sexo: sexoFormateado,
            telefono: telefono,
            correoElectronico: correo,
            area: area,
            cmp: cmp,
            especialidad: {
              idEspecialidad: especialidad, // Ajusta esto según el valor correcto
            },
            foto: base64Data, // Lógica para la foto aquí si es necesario
          };
        
          try {
            const responseData = await registrarMedico(doctorData);
            // Aquí manejas la respuesta del servidor
            if (responseData >= 0) {
              swal({ text: "El registro se realizó con éxito", icon: "success", timer: "2500" });
            } else {
              if (responseData == -1) {
                toast.error("El CMP ya existe en el sistema", { duration: 3000 });
              } else if (responseData == -2) {
                toast.error("El DNI ya existe en el sistema", { duration: 3000 });
              }
            }
          } catch (error) {
            console.error("Error al registrar el médico", error);
          }
        };

      }
    })
  }


  const validateForm = () => {
    // Lógica para validar el formulario antes de pasar a la siguiente parte
    // ...
  }

  return (
    <div>
      <div className="flex justify-end ">
        <div className="flex-end">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
            onClick={handleCancel}
          >
            <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
            Volver
          </button>
        </div>
      </div>
      <h1 className="text-4xl w-full py-10 font-semibold">Crear perfil de doctor</h1>
      <div className="flex ">
        <div className="w-2/3">
          <div className="grid grid-cols-2 md:gap-6">

            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="dniMedico" className="text-gray-500">
                Nombres
              </label>
              <TextInput
                type="text"
                name="nombres"
                id="nombres"
                value={nombreMedico}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                onChange={(event) => {
                  setNombreMedico(event.target.value)
                }}
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="dniMedico" className="text-gray-500">
                Primer apellido
              </label>
              <TextInput
                type="text"
                name="apellidoPaterno"
                id="apellidoPaterno"
                value={apellidoPaterno}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                onChange={(event) => {
                  setApellidoPaterno(event.target.value)
                }}
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="dniMedico" className="text-gray-500">
                Segundo apellido
              </label>
              <TextInput
                type="text"
                name="apellidoMaterno"
                id="apellidoMaterno"
                value={apellidoMaterno}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                onChange={(event) => {
                  setApellidoMaterno(event.target.value)
                }}
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="dniMedico" className="text-gray-500">
                DNI
              </label>
              <TextInput
                type="text"
                name="dni"
                id="dni"
                value={dni}
                minLength={3}
                maxLength={8}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent "
                onChange={(event) => {
                  validateNumberInput(event.target)
                  setDni(event.target.value)
                }}
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
                minLength={3}
                maxLength={6}
                className="block py-2.5 px-0 w-full text-gray-900 bg-transparent"
                value={cmp} //Pendiente: Parsear esto.
                placeholder='ej: 321520, 641001'
                onChange={(event) => {
                  validateNumberInput(event.target)
                  setCmp(event.target.value)
                }
                }
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
                value={telefono}
                onChange={(event) => {
                  validateNumberInput(event.target)
                  setTelefono(event.target.value)
                }}
                required
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
                value={correo}
                //PENDIENTE: HANDLE DISABLED PQ AL INICIO NO DEBERIA
                onChange={(event) => setCorreo(event.target.value)}
                placeholder='ej: ejemplo@gmail.com'
              />
            </div>

            <div className="relative z-1 w-full mb-6 group">
              <label className="text-gray-500">
                Fecha de nacimiento
              </label>
              <div className='py-2.5 px-0'>

                <DatePicker
                  name={"fecha-nacimiento"}
                  selectedDate={fechaNacimiento}
                  setSelectedDate={setFechaNacimiento}
                />
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Area
              </label>

              <Dropdown
                data={[{ descripcion: "Atencion Medica" }, { descripcion: "Laboratorio" }]}
                name={"dropdown-area-medico"}
                defaultText={"Elegir área del médico"}
                text={"descripcion"}
                defaultValue={""}
                width={"w-fit"}
                value={"descripcion"}
                selectedValue={area}
                handleChange={(event) => {
                  setArea(event.target.value)
                }}
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Especialidad
              </label>

              <Dropdown
                data={especialidades}
                name={"dropdown-especialidad-medico"}
                defaultText={"Elegir especialidad del médico"}
                text={"nombre"}
                defaultValue={""}
                width={"w-fit"}
                value={"codigo"}
                selectedValue={especialidad}
                handleChange={(event) => setEspecialidad(event.target.value)}
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="text-gray-500">
                Sexo
              </label>
              <div className='py-2.5 px-0'>

                <Picker
                  name1={"masculino"}
                  name2={"femenino"}
                  option1={"Masculino"}
                  option2={"Femenino"}
                  value={sexo}
                  setValue={setSexo}
                />
              </div>
            </div>
          </div>
        </div>



        <div className="w-1/3 flex flex-col items-center">


          <div className="py-10">
            <img
              src={imagenPerfil}
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
          type="button"
          className="m-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg w-full sm:w-auto px-5 py-3 text-center"
          onClick={handleSave}
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
    </div>
  )
}

export default NewDoctor
