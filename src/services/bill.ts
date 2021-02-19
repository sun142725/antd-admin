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


