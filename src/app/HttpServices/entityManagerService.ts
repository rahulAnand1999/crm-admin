import { AxiosResponse } from "axios";
import { getRequest } from "./httpService"

export const getEntitys = async ()=> {
    try {
        const res: AxiosResponse = await getRequest('metadata/table-list');
        return res.data.map((key) => ({ key }));
    } catch (error) {
        console.error("Error getting entities:", error);
        return [];
    }
}
export const getEntityByName = async (name:string)=> {
    try {
        const res: AxiosResponse = await getRequest(`metadata/table/${name}`);
        return res.data;
    } catch (error) {
        console.error("Error getting entities:", error);
        return null;
    }
}