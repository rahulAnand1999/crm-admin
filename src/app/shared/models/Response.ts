export class Response {
  data: any;
  datas: any[];
  totalRecord: number;
  pageSize: number;
  pageNumber: number;
}
export class AxiosResponse {
    data : Response;
    status: number;
    statusText: string;
}