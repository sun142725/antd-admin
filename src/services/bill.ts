import request from '@/utils/request';

export type ListParamsType = {
  pageSize: number
  pageNum: number
  title?: string
  category?: string
};

export async function list(params: ListParamsType) {
  return request.post('http://localhost:7001/api/bill/list', params);
}
export type InsertParamsType = {
  title: string
  category: string
};
export async function insert(params: InsertParamsType) {
  return request.post('http://localhost:7001/api/bill/insert', params);
}


