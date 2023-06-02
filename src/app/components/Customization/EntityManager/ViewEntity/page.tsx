"use client";
import { useSearchParams } from "next/navigation";
import { Card } from "primereact/card";
import EntityGrid from "./EntityGrid";
import { useEffect, useState } from "react";
import { getAllRecord } from "@/app/HttpServices/TableService";

const ViewEntity = () => {
  const searchParams = useSearchParams();
  const entityName = searchParams.get("entityName");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getAllRecord(entityName).then((data) => {
      setDatas(data);
    });
  }, [entityName]);

  return <Card title={entityName}>
    <EntityGrid datas={datas} columns={[...Object.keys(datas[0] || {}), 'Action']} entityName={entityName}></EntityGrid>
  </Card>;
};

export default ViewEntity;
