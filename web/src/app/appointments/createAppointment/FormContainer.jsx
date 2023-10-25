"use client";
import LegalResponsibility from "./LegalResponsibility";
import PatientForm from "./PatientForm";

// Para acceder a los elementos
// elements.namedItem("first_last_name").value

const FormContainer = () => {
  return (
    <form className="px-10 w-4/5">
      <hr className="bg-gray-600 mt-12" />
      <PatientForm />
      <hr className="bg-gray-300 mt-12" />
      <button
        type="submit"
        className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Registrar
      </button>
    </form>
  );
};

export default FormContainer;
