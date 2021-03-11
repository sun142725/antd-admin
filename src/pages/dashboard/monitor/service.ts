import request from 'umi-request';

export async function queryTags() {
  return request.get('/api/ant/tags');
}
