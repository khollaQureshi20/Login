import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import Mock_Data from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import './table.css';
import { GlobalFilter } from "./GlobalFilter";

const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_Data, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state; 

  return (
    <>
      {/* Pass columns to GlobalFilter */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} columns={columns} />
      
      <table {...getTableProps()} id="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()} key={footerGroup.id}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()} key={column.id}>
                  {column.render('Footer')}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default FilteringTable;
