import request from 'umi-request';

export async function queryCurrent() {
  return request.get('/api/ant/currentUser');
}

export async function queryProvince() {
  return request.get('/api/ant/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request.get('/api/ant/users');
}
