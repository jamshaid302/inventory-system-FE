import React from "react";
import "./style.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
// import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";

const BaseTable = ({
  data,
  columns,
  buttonTitle = "",
  openModal,
  onDelete,
  onView,
  onUpdate,
  setRows,
  setFirst,
  rows,
  first,
  setSearch,
  search = "",
}) => {
  // const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="table-header d-flex justify-content-between align-items-center flex-row">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={search}
          onInput={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </span>
      <div>
        {buttonTitle ? (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={openModal}
          >
            {buttonTitle}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {onView ? (
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-dt-tooltip"
            onClick={() => onView(rowData)}
          />
        ) : (
          <>
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-warning"
              style={{ marginRight: "5px" }}
              onClick={() => onDelete(rowData?.id)}
            />
            <Button
              icon="pi pi-book"
              className="p-button-rounded p-dt-tooltip"
              onClick={() => onUpdate(rowData)}
            />
          </>
        )}
        {/* <Tooltip
          target=".p-dt-tooltip"
          content="Edit"
          mouseTrack
          mouseTrackLeft={10}
        /> */}
      </React.Fragment>
    );
  };

  return (
    <div className="table-center">
      <DataTable
        value={data?.data}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
        // paginator
        rows={10}
        // paginationServer
        // rowsPerPageOptions={[5, 10, 25, 50]}
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
        // globalFilter={globalFilter}
        header={header}
        // filterDisplay="row"
        emptyMessage="No data found."
        className="table-minimize-space"
        scrollHeight={"460px"}
        scrollable
      >
        {/* <Column sortable header="ID" field="id" style={{ width: "" }}></Column>
        <Column
          sortable
          header="Name"
          field="name"
          style={{ width: "" }}
        ></Column>
        <Column header="Age" field="age" style={{ width: "" }}></Column>
        <Column header="Item" field="item" style={{ width: "" }}></Column>
        <Column header="Price" field="price" style={{ width: "" }}></Column> */}
        {columns.map((column) => (
          <Column
            key={column.field}
            sortable={column.sortable}
            header={column.header}
            field={column.field}
            hidden={column?.hidden || false}
          />
        ))}
        {onDelete || onUpdate || onView ? (
          <Column
            body={actionBodyTemplate}
            className="p-dt-tooltip"
            header="Actions"
            style={{ width: "120px" }}
          ></Column>
        ) : (
          ""
        )}
      </DataTable>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={data?.totalRecords}
        onPageChange={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 20, 30, 50]}
      />
    </div>
  );
};

export default BaseTable;
