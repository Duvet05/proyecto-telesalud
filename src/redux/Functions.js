export function getPatients() {
  return fetch("http://localhost:8080/admision/get/paciente", { method: "GET" })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

export function getSpecialty() {
  return fetch("http://localhost:8080/rrhh/get/especialidad", { method: "GET" })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
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
