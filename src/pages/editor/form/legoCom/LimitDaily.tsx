import SingleRule from './components/SingleRule'
//  每人每天最多参与次数(limit_daily)

export default (props: any)=>{
  const { label, required, placeholder } = props
  return <SingleRule label={label} name="limit_daily" required={required} placeholder={placeholder} />
}
