import request from 'umi-request';

export async function queryBasicProfile() {
  return request.get('/api/ant/profile/basic');
}
