import React from "react";
import Table from "@/components/table/Table";
import TableOptions from "@/components/table/TableOptions";
import { getStatus } from "@/util/status";

const LaboratoryTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "codigoOrden",
        header: "Código",
        enableSorting: true,
      },
      {
        accessorKey: "fechaHoraOrden",
        header: "Fecha Actualización",
        enableSorting: true,
      },
      {
        accessorKey: "dniPaciente",
        header: "DNI",
        enableSorting: true,
      },
      {
        accessorKey: "nombrePaciente",
        header: "Nombre completo",
        enableSorting: true,
      },
      {
        accessorKey: "tipoMuestra",
        header: "Muestra",
        enableSorting: true,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        enableSorting: true,
        cell: ({ row }) => {
          const estadoObtenido = getStatus(row.original.estado);
          return (
            <span
              className={`${estadoObtenido.className}  inline-block text-center w-[120px]`}
            >
              {estadoObtenido.text}
            </span>
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Opciones",
        cell: ({ row }) => (
          <TableOptions
            id={row.original.idOrdenLaboratorio}
            options={options}
          />
        ),
      },
    ],
    []
  );

  const options = [
    {
      text: "Ver laboratorio",
      link: "/laboratories/profile",
      icon: "fa fa-eye",
    },
  ];

  return <Table columns={columns} data={data} options={options} />;
};

export default LaboratoryTable;
