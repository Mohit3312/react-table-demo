import React from "react";
import { useMemo } from "react";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import { useTable } from "react-table";
import "./table.css";

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  //   const tableInstance = useTable({
  //     columns,
  //     data,
  //   });

  //   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //     tableInstance;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((header) => (
              <th {...header.getHeaderProps()}>{header.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
