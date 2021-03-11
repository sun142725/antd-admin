import request from 'umi-request';

export async function fakeChartData() {
  return request.get('/api/ant/fake_chart_data');
}
