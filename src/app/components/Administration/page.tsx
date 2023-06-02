"use client";
import Link from "next/link";
import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Administration = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const data = [
    {
      id: 1,
      name: "Entity  manager",
      link: "/components/Customization/EntityManager",
      desc: "About Entity",
    },
    { id: 2, name: "Page 2", link: "/page2", desc: "page Entity" },
    { id: 3, name: "Page 3", link: "/page3", desc: "About Entity" },
  ];
  return (
    <div>
      <div>
        <h3>Administration</h3>
        <div className="p-inputgroup" style={{ marginTop: "1rem" }}>
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="custom-input w-full"
          />
        </div>
      </div>

      <DataTable
        key={globalFilter}
        value={data}
        tableStyle={{ minWidth: "50rem" }}
        tableClassName="w-full"
        globalFilter={globalFilter}
        globalFilterFields={["name", "desc"]}
      >
        <Column
          field="link"
          header="Link"
          body={(rowData) => <Link href={rowData.link}>{rowData.name}</Link>}
        ></Column>
        <Column
          field="desc"
          header="Description"
          style={{ width: "35%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default Administration;
