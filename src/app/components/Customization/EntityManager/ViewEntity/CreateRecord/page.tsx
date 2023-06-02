"use client"

import { findOne, insertRecord } from "@/app/HttpServices/TableService";
import { getEntityByName } from "@/app/HttpServices/entityManagerService";
import { ColumnInfo } from "@/app/shared/models/ColumnInfo";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const CreateRecord = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const entityName = searchParams.get('entityName');
    const recordId = searchParams.get('recordId');
    const [columnInfo, setColumnInfo] = useState<ColumnInfo[]>([]);
    let [record, setRecord] = useState({});

    useEffect(() => {
        let primaryKey;
        if (entityName) {
            getEntityByName(entityName).then((res) => {
                setColumnInfo(res);
                primaryKey = res.find((val) => val.constraints === 'PRIMARY KEY');
                if (primaryKey && primaryKey.columnName && recordId) {
                    findOne(entityName, primaryKey.columnName, recordId).then((res) => {
                        if (res) setRecord(res[0]);
                    });
                }
            });
        }
    }, [entityName]);

    const saveRecord = () => {
        insertRecord(entityName, record).then((res) => {
            console.log(res)
        });
        record = {};
        router.back();
        setRecord(record);
    }

    return <Card title={recordId ?'Update Record':'Add Record'}>
        <div className="grid">
            {
                columnInfo && columnInfo.length && columnInfo.map((col: ColumnInfo, index) => {
                    return <div className="col-3" key={index}>
                        <InputText placeholder={col.columnName} value={record[col.columnName]}
                            onChange={(e) => {
                                record[col.columnName] = e.target.value;
                                setRecord(record);
                            }}
                        />
                    </div>
                })
            }
        </div>
        <div className="grid">
            <div className="col-12 text-right">
                <Button label="Save" onClick={() => {
                    saveRecord()
                }}></Button>
            </div>
        </div>
    </Card>
}
export default CreateRecord;    