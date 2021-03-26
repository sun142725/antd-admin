import SingleRule from './components/SingleRule';

//  每人每天最多参与次数(limit_daily)
const LimitDaily = () => {
  return (
    <SingleRule
      label="每天最多参与次数"
      name="limit_daily"
      required={true}
      placeholder="请输入每人每天最多参与次数"
    />
  );
};

//  每人总参与次数(limit_total)
const LimitTotal = () => {
  return (
    <SingleRule
      label="每人总参与次数"
      name="limit_total"
      required={true}
      placeholder="请输入每人总参与次数"
    />
  );
};

export { LimitDaily, LimitTotal };
