import { Relation } from "@/app/shared/models/Table";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

interface FieldProps {
    relations: Relation[];
    onRemoveRelation:Function;
    onValueChange?: Function;
  }
const Relations: React.FC<FieldProps> = (props) => {
    return (
        <>
      {props.relations.map((e: Relation,index) => {
        return FieldSet(e,index,props);
      })}
    </>
    );
}
const FieldSet = (e:Relation,index,props) =>{
    const handlemoveRelation=(index: any)=> {
      if(props.onRemoveRelation) props.onRemoveRelation(index);
    }
    return <div className="grid" key={index}>
            <div className="col">
              <InputText 
                className="w-full" 
                placeholder="Type" 
                value={e.type}
                onChange={(e) => { if (props.onValueChange) props.onValueChange('type', e, index) }}
              />
            </div>
            <div className="col">
              <InputText 
                className="w-full" 
                placeholder="Source Column" 
                value={e.sourceColumn}
                onChange={(e) => { if (props.onValueChange) props.onValueChange('sourceColumn', e, index) }}
              />
            </div>
            <div className="col">
              <InputText 
                className="w-full" 
                placeholder="Reference Table" 
                value={e.referenceTable}
                onChange={(e) => { if (props.onValueChange) props.onValueChange('referenceTable', e, index) }}
              />
            </div>
            <div className="col">
              <InputText 
                className="w-full" 
                placeholder="Reference Column" 
                value={e.referenceColumn}
                onChange={(e) => { if (props.onValueChange) props.onValueChange('referenceColumn', e, index) }}
              />
            </div>
            <div className="col">
              <Button icon="pi pi-minus" 
                onClick={()=> handlemoveRelation(index)}
                // disabled={index === 0}
              />
            </div>
          </div>
  }
export default Relations;