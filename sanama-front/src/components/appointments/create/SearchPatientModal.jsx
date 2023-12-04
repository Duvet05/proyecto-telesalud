import { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'
import { patientService } from '@/services/patientService'

const SearchPatientModal = ({ show, onClose, onSelect }) => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const fetchData = async (filtro) => {
        try {
            const data = await patientService.buscarPacienteModal(filtro)
            setSearchResults(data)
            //console.log(data)
        } catch (error) {
            console.log("No se pudo obtener los datos de los pacientes para el modal")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (searchText) {
            fetchData(searchText)
        } else {
            setSearchResults([])
        }
    }, [searchText])

    const handlePatientSelect = (selectedPatient) => {
        setSelectedPatient(selectedPatient)
        setSearchResults([])
        setSearchText('')

    }

    const handleConfirm = () => {
        if (selectedPatient) {
            onSelect(selectedPatient)
            onClose()
            resetModalFields()
        }
    }

    const resetModalFields = () => {
        setSelectedPatient(null)
        setSearchText('')
    }


    return (
        <Modal show={show} className='bg-opacity-30' size="6xl" popup onClose={onClose} >
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <h3 className="p-4 mb-6 text-2xl font-bold text-gray-900">Buscar paciente existente</h3>
                <div className="space-y-2 ">
                    <div className="relative">
                        <div className="flex rounded-md m-2 bg-white shadow shadow-black/20">
                            <input
                                id="search-modal"
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="rounded-l block w-full flex-1  px-4 "
                                placeholder="Ingresar el nombre o dni del paciente" />
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className=" inline-flex cursor-pointer items-center rounded-r text-white bg-green-500 px-2 py-2 hover:bg-green-400">
                                Confirmar
                            </button>
                        </div>
                    </div>

                    {searchResults.length > 0 && searchText && (
                        <div className="w-full max-h-screen overflow-y-auto rounded-md bg-white px-4 pt-3">
                            {searchResults.slice(0, 6).map((result, index) => (
                                <div
                                    key={index}
                                    onClick={() => handlePatientSelect(result)}
                                    className="cursor-pointer py-2 px-3 hover:bg-slate-100 rounded">
                                    <p className="text-sm font-medium text-black">
                                        {result.nombres} {result.apellidoPaterno} {result.apellidoMaterno}
                                    </p>
                                    <p className="text-sm text-black">
                                        {result.dni}
                                    </p>
                                </div>
                            ))}
                            {loading && (
                                <div className="py-2 px-3">
                                    <p className="text-sm text-gray-500">Cargando resultados...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Modal.Body>

            <Modal.Footer >
                <div className="flex">
                    {selectedPatient && (
                        <div className="py-2 px-3">
                            <p className="text-m font-semibold  text-black">
                                Información del paciente seleccionado:
                            </p>
                            <p className="text-sm text-black">
                                Nombre: {selectedPatient.nombres} {selectedPatient.apellidoPaterno} {selectedPatient.apellidoMaterno}
                            </p>
                            <p className="text-sm text-black">
                                DNI: {selectedPatient.dni}
                            </p>
                        </div>
                    )}

                </div>
            </Modal.Footer>
        </Modal>


    )
}

export default SearchPatientModal
