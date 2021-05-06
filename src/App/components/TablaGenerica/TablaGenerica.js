import React from "react";
import {useTable, usePagination} from "react-table";
import {Table, Button, Form} from "react-bootstrap";

import MiniLoading from "../MiniLoading/MiniLoading";
const defaultPropGetter = () => ({});

function TablaGenerica({
  columns,
  data,
  fetchData,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  loading,
  pageCount: controlledPageCount,
  totalRegis,
  fnPaginaIndex,
  reset
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage, 
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: {pageIndex, pageSize},
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0}, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  );

  const [searchValue, setsearchValue] = React.useState("");

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({pageSize, pageIndex, searchValue});
  }, [pageIndex, pageSize, searchValue, nextPage]);

  React.useEffect(() => {
    if (reset) {
      gotoPage(0);
    }
    return () => {};
  }, [reset]);

  // Render the UI for your table
  return (
    <>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div className="btn-group btn-group-sm" role="group">
            <select
              className="custom-select custom-select-sm form-control form-control-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 align-items-center text-center">
          {loading ? <MiniLoading></MiniLoading> : <p></p>}
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div className="form-group form-group-sm react-bs-table-search-form input-group input-group-sm">
            <Form.Control
              type="text"
              id="searchVal"
              placeholder="Buscar"
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table
        id="tbA"
        {...getTableProps()}
        className="table-columned table-sm table-condensed table-wrapper-scroll-x cssTable"
        style={{overflow: "hidden", fontSize: "11px"}}
        responsive
        hover
      >
        <thead style={{fontSize: "12px"}}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style,
                    },
                    getColumnProps(column),
                    getHeaderProps(column),
                  ])}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      // Return an array of prop objects and react-table will merge them appropriately
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
      {/*
          Pagination can be built however you'd like.
          This is just a very basic UI implementation:
        */}
      <div className="row">
        <div className="col-sm-4 col-md-4">
          <div className="dataTables_info">
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <p>Loading..</p>
            ) : (
              <p>
                Showing {pageIndex * pageSize + 1} to{" "}
                {(pageIndex + 1) * pageSize > totalRegis
                  ? totalRegis
                  : (pageIndex + 1) * pageSize}{" "}
                of {totalRegis} entries.
              </p>
            )}
          </div>
        </div>
        <div className="col-sm-4 col-md-4">
          <nav>
            <ul className="pagination justify-content-center">
              <li className="paginate_Button page-item">
                <Button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="page-link "
                >
                  {" "}
                  {"<<"}{" "}
                </Button>
              </li>
              <li className="paginate_Button page-item">
                <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="page-link "
                >
                  {"<"}
                </Button>
              </li>
              <li className="paginate_Button page-item">
                <Button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="page-link "
                >
                  {">"}
                </Button>
              </li>
              <li className="paginate_Button page-item">
                <Button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className="page-link "
                >
                  {">>"}
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-sm-4 col-md-4 d-flex flex-row-reverse">
       
        </div>
      </div>
    </>
  );
}

export default TablaGenerica;
