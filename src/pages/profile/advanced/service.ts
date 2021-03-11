import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request.get('/api/ant/profile/advanced');
}
