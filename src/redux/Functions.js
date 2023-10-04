const API_BASE_URL = "http://localhost:8080";

export async function fetchData(url, method = "GET", data = null) {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  return response.json();
}

export function getPatients() {
  return fetchData("/admision/get/paciente");
}

export function getSpecialty() {
  return fetchData("/rrhh/get/especialidad");
}

export function searchPatientsByName(name) {
  return fetchData("/admision/post/buscarPaciente", "POST", {
    pv_filtro: name,
  });
}

/*
export function obtenerModelosXMarca(idMarcaE) {
    return fetch(LINKSERVER+"/api/modelo/listarMarca", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({idMarca: idMarcaE})
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        return response.json();
    })
    .catch(error => {
            console.error('Error:', error);
            throw error;
        }
    );
    }


    export function cargaMasivaClientesEspecialesPrueba (archivo) {
        //Utiles
        const formData = new FormData();
        formData.append('file',archivo);
        return fetch(LINKSERVER+"/api/listanegra/cargaPrueba", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('File upload failed');
            }else{
                return response.text();
            }
        })
        .catch(error => {
            console.error('Error Uploading File:', error);
            throw error;
        });
    }
    */
