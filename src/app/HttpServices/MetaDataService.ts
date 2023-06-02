
import { AxiosResponse } from "axios";
import { getRequest } from "./httpService";

export const getDataTypes = async ()=> {
    try {
        const res: AxiosResponse = await getRequest(`metadata/data-types`);
        return res.data;
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
}

export const getConstrains =  async ()=> {
    try {
        const res: AxiosResponse = await getRequest(`metadata/enum-type/contraints`);
        return res.data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}