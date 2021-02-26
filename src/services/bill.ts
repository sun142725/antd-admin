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
  amount: number
};
export async function insert(params: InsertParamsType) {
  return request.post('http://localhost:7001/api/bill/insert', params);
}

export type UpdateParamsType = {
  id: string
  title?: string
  category?: string
  type?: string
  amount?: number
};
export async function update(params: UpdateParamsType) {
  return request.post('http://localhost:7001/api/bill/update', params);
}
export type DelParamsType = {
  id: string
};
export async function billDelete(params: DelParamsType) {
  return request.post('http://localhost:7001/api/bill/delete', params);
}
export type GetBillStaticType = {
  type: string,
  startTime: string
  endTime: string
};
export async function getBillStatic(params: any) {
  return request.post('http://localhost:7001/api/bill/getBillStatic', params);
}
export type CalcBillByCurrentMonthType = {
  type: string|number
};
export async function calcBillByCurrentMonth(params: CalcBillByCurrentMonthType) {
  return request.post('http://localhost:7001/api/bill/calcBillByCurrentMonth', params);
}
