import { AxiosResponse } from "axios";
import { Table } from "../shared/models/Table";
import { getRequest, postRequest } from "./httpService";

export const createTable = async (data: Table) => {
  try {
    const res: AxiosResponse = await postRequest(`ddl/create`, data);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const alterTable = async (tableName: string, data: Table) => {
  try {
    const res: AxiosResponse = await postRequest(
      `ddl/table/${tableName}/add-columns`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getAllRecord = async (tableName) => {
  try {
    const res: AxiosResponse = await getRequest("dml/table/" + tableName);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
export const insertRecord = async (tableName, body) => {
  try {
    const res: AxiosResponse = await postRequest(
      "dml/insert/table/" + tableName,
      body
    );
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const findOne = async (tableName,columnName,recordId) => {
  try {
    const res: AxiosResponse = await getRequest(
      `dml/findOne/table/${tableName}/columnName/${columnName}/record/${recordId}`
    )
    return res.data;
  } catch (error) {
    
  }
}
