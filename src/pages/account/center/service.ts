import request from 'umi-request';

export async function queryCurrent() {
  return request.get('/api/ant/currentUser');
}

export async function queryFakeList(params: { count: number }) {
  return request.get('/api/ant/fake_list', {
    params,
  });
}
