import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableSortLabel,
} from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const BaseTable = ({ fetchData, columns, RowComponent, extraProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);

  useEffect(() => {
    fetchDataFunction();
  }, [extraProps]);

  const fetchDataFunction = async () => {
    try {
      const fetchedData = await fetchData(extraProps);
      setData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading(false);
    }
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    !isLoading && (
      <TableContainer component={Paper}>
        <Table>
          <BaseTableHead
            handleSortRequest={handleSortRequest}
            order={order}
            orderBy={orderBy}
            columns={columns}
          />
          <BaseTableBody data={data} RowComponent={RowComponent} />
        </Table>
      </TableContainer>
    )
  );
};

const BaseTableHead = ({ handleSortRequest, order, orderBy, columns }) => (
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          sx={{
            fontSize: "1.1em",
            color: "#333",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
          sortDirection={orderBy === column.id ? order : false}
        >
          {column.sortable ? (
            <TableSortLabel
              active={orderBy === column.id}
              direction={order}
              onClick={() => handleSortRequest(column.id)}
            >
              {column.label}
            </TableSortLabel>
          ) : (
            column.label
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const BaseTableBody = ({ data, RowComponent }) => (
  <TableBody>
    {data.map((item) => (
      <RowComponent key={item.id} data={item} />
    ))}
  </TableBody>
);

export default BaseTable;
