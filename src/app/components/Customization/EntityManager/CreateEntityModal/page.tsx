
"use client"
import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from 'primereact/tabview';
import { Column, Table, Relation } from "@/app/shared/models/Table";
import { useSearchParams } from 'next/navigation';
import { getEntityByName } from "@/app/HttpServices/entityManagerService";
import { ColumnInfo } from "@/app/shared/models/ColumnInfo";
import { createTable } from "@/app/HttpServices/TableService";
import { getEntitys } from "@/app/HttpServices/entityManagerService";
import { EntityUtil } from "@/app/shared/utils/EntityUtil";
import { SidebarContext } from "@/app/context/sidebarcontext";
import { getConstrains, getDataTypes } from "@/app/HttpServices/MetaDataService";
import { Formik, Form, FieldArray } from 'formik';
import { AutoComplete } from "primereact/autocomplete";
import * as Yup from 'yup';
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";

const CreateEntityModal = (props) => {
  const searchParams = useSearchParams();
  const entityName = searchParams.get('entityName');
  const [table, setTable] = useState<Table>(new Table());
  const [activeTab, setActiveTab] = useState(0);
  const [columnInfo, setColumnInfo] = useState<ColumnInfo[]>([]);
  const { menus, setMenus } = useContext(SidebarContext);
  const [dataTypes, setDataTypes] = useState([]);
  const [filteredDataTypes, setFilteredDataTypes] = useState([]);
  const [constraints, setConstrains] = useState([]);
  const initialvalues: Table = new Table();
  /*  const tableValidationSchema = Yup.object().shape({
 
   }) */

  const handlemoveColumn = (index: any) => {
    if (props.onRemoveColumn) props.onRemoveColumn(index);
  }
  const getDataTypesFromApi = () => {
    getDataTypes().then((res) => {
      setDataTypes(res);
    });
  }
  const getConstrainsFromApi = () => {
    getConstrains().then((res) => {
      setConstrains(res);
    })
  }
  const cleanFormTable = () => {
    let data = new Table();
    data.columns.push(new Column());
    data.relationships.push(new Relation());
    setTable(data);
  }
  useEffect(() => {
    getConstrainsFromApi();
    getDataTypesFromApi();
    if (entityName) {
      getEntityByName(entityName).then((res) => {
        setColumnInfo(res);
      })
    }
    cleanFormTable();
  }, [])
  const handlTableNameChange = (e) => {
    let data = { ...table };
    data.tableName = e.target.value;
    setTable(data);
  }

  const handleColumnRemove = (ev) => {
    let data: Table = JSON.parse(JSON.stringify(table));
    data.columns = data.columns.filter((e, i) => i !== ev);
    setTable(data);
  }

  const handleRelationRemove = (ev) => {
    let data: Table = JSON.parse(JSON.stringify(table));
    data.relationships = data.relationships.filter((e, i) => i !== ev);
    setTable(data);
  }

  const handleAddColumn = () => {
    if (activeTab == 0) {
      let data = { ...table };
      data.columns.push(new Column());
      setTable(data);
    } else {
      let data = { ...table };
      data.relationships.push(new Relation());
      setTable(data);
    }
  }

  const handleTabChange = (e) => {
    setActiveTab(e.index)
  }

  const handleFieldValueChange = (field, param, index) => {
    let data: Table = JSON.parse(JSON.stringify(table));
    if (field == 'constraints') {
      data.columns[index][field] = param.value;
    } else {
      data.columns[index][field] = param.target.value;
    }
    setTable(data);
  }

  const handleRelationValueChange = (field, param, index) => {
    let data: Table = JSON.parse(JSON.stringify(table));
    data.relationships[index][field] = param.target.value;
    setTable(data);
  }
  const searchDataType = (event) => {
    setTimeout(() => {
      let _filteredDatatypes;
      if (!event.query.trim().length) {
        _filteredDatatypes = [...dataTypes];
      }
      else {
        _filteredDatatypes = dataTypes.filter((dt: string) => {
          return dt.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredDataTypes(_filteredDatatypes);
    }, 100)
  };
  const handleSave = (value: Table, { resetForm }) => {
    let data = { ...value };
    data.relationships = [];
    createTable(data).then((res) => {
      getEntitys().then((res) => {
        let updatedMenus = EntityUtil.getEntityList(menus, res);
        setMenus(updatedMenus);
        resetForm();
      });
    })
  }
  return (<>
    <Formik initialValues={initialvalues} onSubmit={handleSave} >
      {({ values, handleChange, handleSubmit }) => (
        <Form>
          <div className="grid">
            <div className="col-3">
              <div className="flex flex-column gap-2">
                <InputText
                  name="tableName"
                  value={values.tableName}
                  placeholder="Table Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-3 text-right">
              <Button
                icon="pi pi-save"
                label="Save"
                iconPos="left"
                type="submit"
              />
            </div>
            <div className="col-12">
              <TabView activeIndex={activeTab} onTabChange={(e) => handleTabChange(e)}>
                <TabPanel header="Fields">
                  <FieldArray name="columns" render={(fields) => (
                    <div className="grid">
                      <div className="col-12">
                        <Button
                          icon="pi pi-plus"
                          label="Field"
                          iconPos="left"
                          style={{ position: 'absolute', right: '45px', padding: '10px', marginTop: '-70px', zIndex: '1' }}
                          onClick={(e) => {
                            fields.push(new Column());
                            e.preventDefault();
                          }}
                        />
                        {
                          values.columns.map((e: Column, index) => {
                            return (
                              <div className="grid" key={index}>
                                <div className="col">
                                  <InputText
                                    className="w-full"
                                    name={`columns.${index}.name`}
                                    value={e.name}
                                    placeholder="Name"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col">
                                  {/* <Dropdown
                                    className="w-full"
                                    name={`columns.${index}.dataType`}
                                    value={e.dataType}
                                    placeholder="Data Type"
                                    options={dataTypes}
                                    onChange={handleChange}
                                  /> */}
                                  <AutoComplete
                                    value={e.dataType}
                                    suggestions={filteredDataTypes}
                                    completeMethod={searchDataType}
                                    onChange={handleChange}
                                    dropdown={true}
                                    name={`columns.${index}.dataType`}
                                    className={"w-full"}
                                  />
                                </div>
                                <div className="col">
                                  <InputText
                                    className="w-full"
                                    name={`columns.${index}.defaultValue`}
                                    value={e.defaultValue}
                                    placeholder="Default Value"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col">
                                  <MultiSelect
                                    value={e.constraints}
                                    options={constraints}
                                    display="chip"
                                    name={`columns.${index}.constraints`}
                                    placeholder="Constraints"
                                    maxSelectedLabels={2}
                                    className="w-full md:w-15rem"
                                    // optionDisabled={(option: any) => handlePrimaryKeyDisable(option, 'PRIMARY KEY', props.columns)}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-1">
                                  <Button icon="pi pi-minus"
                                    onClick={(e) => {
                                      fields.remove(index);
                                      e.preventDefault();
                                    }}
                                  // disabled={index === 0}
                                  />
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )} />
                </TabPanel>
                <TabPanel header="Relationships">
                  <FieldArray name="relationships" render={(fields) => (
                    <div className="grid">
                      <div className="col-12">
                        <Button
                          icon="pi pi-plus"
                          label="Relation"
                          iconPos="left"
                          style={{ position: 'absolute', right: '45px', padding: '10px', marginTop: '-70px', zIndex: '1' }}
                          onClick={(e) => {
                            fields.push(new Relation());
                            e.preventDefault();
                          }}
                        />{
                          values.relationships.map((e: Relation, index) => {
                            return (
                              <div className="grid" key={index} >
                                <div className="col">
                                  <InputText
                                    className="w-full"
                                    name={`relationships.${index}.type`}
                                    placeholder="Type"
                                    value={e.type}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col">
                                  <InputText
                                    className="w-full"
                                    placeholder="Source Column"
                                    name={`relationships.${index}.type`}
                                    value={e.sourceColumn}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col">
                                  <InputText
                                    className="w-full"
                                    placeholder="Reference Table"
                                    name={`relationships.${index}.referenceTable`}
                                    value={e.referenceTable}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col">
                                  <InputText
                                    placeholder="Reference Column"
                                    name={`relationships.${index}.referenceColumn`}
                                    value={e.referenceColumn}
                                    className="w-full"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-1">
                                  <Button icon="pi pi-minus"
                                    onClick={(e) => {
                                      fields.remove(index);
                                      e.preventDefault();
                                    }}
                                  // disabled={index === 0}
                                  />
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )} />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </>
  );
};

export default CreateEntityModal;
