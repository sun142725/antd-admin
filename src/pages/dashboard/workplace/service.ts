import request from 'umi-request';

export async function queryProjectNotice() {
  return request.get('/api/ant/project/notice');
}

export async function queryActivities() {
  return request.get('/api/ant/activities');
}

export async function fakeChartData() {
  return request.get('/api/ant/fake_chart_data');
}

export async function queryCurrent() {
  return request.get('/api/ant/currentUser');
}
