import { Environment } from "@/Environment/Environment";
import axios from "axios";


export const getRequest= async (path : string)=> {
  return axios.get(`${Environment.API_URL}${path}`);
}

export const postRequest= async (path : string, data:any)=> {
  return axios.post(`${Environment.API_URL}${path}`,data)
} 