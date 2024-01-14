import React from "react";
import { useMemo } from "react";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import { useTable, usePagination } from "react-table";
import "./table.css";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <>
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
          {page.map((row) => {
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
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};
