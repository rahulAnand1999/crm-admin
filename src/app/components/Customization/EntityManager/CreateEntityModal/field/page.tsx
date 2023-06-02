import { Column } from "@/app/shared/models/Table";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from 'primereact/multiselect';
import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { useFormikContext } from 'formik';
interface FieldProps {
  columns: Column[];
  // onRemoveColumn: Function;
  onValueChange?: Function;
  dataTypes: string[];
  constraints: string[];
}
const Field: React.FC<FieldProps> = (props) => {
  const formik = useFormikContext();
  return (
    <>
      {props.columns.map((e: Column, index) => {
        return FieldSet(e, index, props);
      })}
    </>
  )
};


const FieldSet = (e: Column, index, props) => {

  const handlemoveColumn = (index: any) => {
    if (props.onRemoveColumn) props.onRemoveColumn(index);
  }
  const handlePrimaryKeyDisable = (option:any, optionName:string, columns:Column[])=> {
    let optSelected = false;
    if(columns && columns.length) {
      columns.forEach((col)=> {
        if(col.constraints && col.constraints.length) {
          let ifselected = col.constraints.find((val)=> val === optionName);
          if(ifselected) {
            optSelected = option === optionName;
          }
        }
      });
    }
    if(optSelected) return true;
    else return false;
  }
  return <div className="grid" key={index}>
    <div className="col">
      <InputText
        className="w-full"
        value={e.name}
        name="name"
        placeholder="Name"
        onChange={(e) => { if (props.onValueChange) props.onValueChange(e) }}
      />
    </div>
    <div className="col">
      <Dropdown
        className="w-full"
        value={e.dataType}
        name="dataType"
        placeholder="Data Type"
        options={props.dataTypes}
        onChange={(e) => { if (props.onValueChange) props.onValueChange(e) }}
      />
    </div>
    <div className="col">
      <InputText
        className="w-full"
        name="defaultValue"
        value={e.defaultValue}
        placeholder="Default Value"
        onChange={(e) => { if (props.onValueChange) props.onValueChange(e) }}
      />
    </div>
    <div className="col">
      <MultiSelect
        value={e.constraints}
        options={props.constraints}
        display="chip"
        name="constraints"
        placeholder="Constraints"
        maxSelectedLabels={2}
        className="w-full md:w-15rem"
        optionDisabled={(option: any)=> handlePrimaryKeyDisable(option,'PRIMARY KEY',props.columns)}
        onChange={(e) => { if (props.onValueChange) props.onValueChange(e) }}
      />
    </div>
    <div className="col">
    <Button icon="pi pi-minus"
        onClick={() => handlemoveColumn(index)}
        // disabled={index === 0}
      />
    </div>
  </div>
}
export default Field;
