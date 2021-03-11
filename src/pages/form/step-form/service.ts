import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  return request.get('/api/ant/forms', {
    method: 'POST',
    data: params,
  });
}
