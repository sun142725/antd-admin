import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request.get('/api/ant/rule', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request.get('/api/ant/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request.get('/api/ant/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request.get('/api/ant/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
