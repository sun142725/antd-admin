import SingleRule from './components/SingleRule'
//  每人每天中奖次数(win_daily_times)

export default (props: any)=>{
  const { label, required, placeholder } = props
  return <SingleRule label={label} name="win_daily_times" required={required} placeholder={placeholder} />
}
