export function parseLaboratoryTable(data) {
    return data.map(row => {
        const medico = row.citaMedica.medico;

        let estadoTexto;
        let estadoClase; 
        switch (row.estado) {
            case 1:
                estadoTexto = "Atendida";
                estadoClase = "bg-atendida"; 
                break;
            case 2:
                estadoTexto = "En Consultorio";
 
                break;
            case 3:
                estadoTexto = "Cancelada";

                break;
            case 4:
                estadoTexto = "Pendiente";
                estadoClase = "bg-pendiente"; 
                break;
            default:
                estadoTexto = "Desconocido";

        }

        const fechaOrden = row.fechaOrden.split('-').reverse().join('-'); 

        return [
            { "data": row.idOrdenLaboratorio }, // ID
            { "data": `${fechaOrden}     ${row.horaOrden}`},
            { "data": `${medico.nombres} ${medico.apellidoPaterno} ${medico.apellidoMaterno}` },
            { "data": row.tipoMuestra }, // TIPO DE ORDEN/EXAMEN
            { "data": estadoTexto, "className": estadoClase },  // ESTADO con su clase
        ];
    });
}