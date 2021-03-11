import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request.post('/api/ant/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function query(): Promise<any> {
  return request.get('/api/ant/users');
}

export async function queryCurrent(): Promise<any> {
  return request.get('/api/ant/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request.get('/api/ant/notices');
}
