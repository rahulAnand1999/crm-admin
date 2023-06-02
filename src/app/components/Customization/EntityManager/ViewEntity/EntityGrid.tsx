import React, { useState, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { RouterPath } from "@/app/shared/constants/Router";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { ToastContext } from "@/app/context/ToastContext";

const EntityGrid = ({ datas, columns, entityName }) => {
  const { toastRef } = useContext(ToastContext);
  const [globalFilter, setGlobalFilter] = useState("");
  const showToaster = (
    severity: "success" | "info" | "warn" | "error",
    header: string,
    content: string
  ) => {
    toastRef.current?.show({
      severity: severity,
      summary: header,
      detail: content,
      life: 3000,
    });
  };
  const openConfirmationModal = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        showToaster("success", "Successfully", "Deleted");
      },
      reject: () => {},
    });
  };

  const handleDeleteRecord = (rowData) => {
    openConfirmationModal(rowData);
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(datas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, `${entityName}_data.xlsx`);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.click();
  };
  return (
    <div>
      <div className="grid">
        <div className="col-7">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="w-full"
            style={{ width: "3rem", marginRight: "65mm" }}
          />
        </div>
        <div className="col-3">
          <Link
            href={{ pathname: RouterPath.CREATE_RECORD, query: { entityName } }}
          >
            <Button
              label={"Add Record"}
              icon="pi pi-plus"
              className="w-full"
            ></Button>
          </Link>
        </div>
        <div className="col-2">
          <Button
            type="button"
            label={"Export"}
            icon="pi pi-file-excel"
            onClick={exportExcel}
            data-pr-tooltip="XLSX"
          />
        </div>
      </div>
      <DataTable value={datas} globalFilter={globalFilter} key={globalFilter}>
        {columns &&
          columns.map((column, index) => {
            if (column === "Action") {
              return (
                <Column
                  key="actionColumn"
                  field={column}
                  header="Action"
                  body={(rowData) => (
                    <div>
                      <Link
                        href={{
                          pathname: RouterPath.CREATE_RECORD,
                          query: { entityName, recordId: rowData.id },
                        }}
                      >
                        <Button icon="pi pi-pencil" className="mr-2" />
                      </Link>
                      <Button
                        icon="pi pi-trash"
                        iconPos="right"
                        onClick={() => handleDeleteRecord(rowData)}
                      />
                    </div>
                  )}
                />
              );
            } else {
              return (
                <Column
                  key={column}
                  field={column}
                  header={column}
                  body={(rowData) => {
                    if (index == 0) {
                      return (
                        <Link
                          href={{
                            pathname: RouterPath.ENTITY_DETAIL,
                            query: { rowId: rowData.id },
                          }}
                        >
                          {rowData[column]}
                        </Link>
                      );
                    } else {
                      return rowData[column];
                    }
                  }}
                />
              );
            }
          })}
      </DataTable>
    </div>
  );
};

export default EntityGrid;
