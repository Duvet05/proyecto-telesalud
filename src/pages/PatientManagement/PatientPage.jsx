import {React, useState, useEffect} from "react"
import { PatientTable } from "../../components/patient/PatientTable"


const PatientPage = (props) => {
  return (
    <div>
      <h1>Lista de pacientes</h1>
      <hr></hr>
      <PatientTable className= 'tablaPacientes'></PatientTable>
    </div>
  )
}

export default PatientPage
