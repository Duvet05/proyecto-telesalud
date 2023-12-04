import React from "react";
import Table from "@/components/table/Table";

const LaboratoryMSTable = ({ data }) => {
  const columns = React.useMemo(() => [
    {
      accessorKey: "nombreArchivo",
      header: "Nombre del Archivo",
      enableSorting: true,
    },
    {
      accessorKey: "medicoFirmante",
      header: "Médico Firmante",
      enableSorting: true,
    },
    {
      accessorKey: "tipoMuestra",
      header: "Tipo de Muestra",
      enableSorting: true,
    },
    {
      accessorKey: "downloadUrl",
      header: "Archivo",
      cell: ({ row }) => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href={row.original.downloadUrl} download={row.original.nombreArchivo} className="inline-block">
            Descargar
          </a>
        </button>
      ),
    },
  ], []);

  return <Table columns={columns} data={data} />;
};

export default LaboratoryMSTable;