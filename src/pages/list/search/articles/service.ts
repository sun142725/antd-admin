import request from 'umi-request';
import { ListItemDataType } from './data.d';

export async function queryFakeList(params: ListItemDataType) {
  return request.get('/api/ant/fake_list', {
    params,
  });
}
