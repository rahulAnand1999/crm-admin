"use client";
import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Link from "next/link";
import { getEntitys } from "@/app/HttpServices/entityManagerService";
import { RouterPath } from "@/app/shared/constants/Router";
import { SidebarContext } from "@/app/context/sidebarcontext";
import { EntityUtil } from "@/app/shared/utils/EntityUtil";

export default function EntityManager() {
  const { menus, setMenus } = useContext(SidebarContext);
  const [globalFilter, setGlobalFilter] = useState("");
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    getEntitys().then((res: any) => {
      setEntities(res);
      let updatedMenus = EntityUtil.getEntityList(menus, res);
      setMenus(updatedMenus);
    });
  }, []);
  const dataTableHeader = () => {
    return (
      <>
        <div className="grid">
          <div className="col-9">
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search"
              className="w-full"
              style={{ width: "3rem", marginRight: "65mm" }}
            />
          </div>
          <div className="col-3">
            <Link href={RouterPath.CREATE_ENTITY}>
              <Button
                label="Create Entity"
                icon="pi pi-plus"
                className="w-full"
              ></Button>
            </Link>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      {dataTableHeader()}
      <DataTable value={entities} globalFilter={globalFilter} key={globalFilter}>
        <Column
          field="key"
          header="Name"
          body={(rowData) => {
            let entityName = rowData.key;
            return (
              <Link
                href={{
                  pathname: RouterPath.CREATE_ENTITY,
                  query: {
                    entityName,
                  },
                }}
              >
                {rowData.key}
              </Link>
            );
          }}
        />
      </DataTable>
    </div>
  );
}
