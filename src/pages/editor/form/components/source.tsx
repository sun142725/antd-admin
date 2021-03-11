
import { Button, Input, Checkbox, Switch } from 'antd'


export const dataSource = [
   {
    title: '基础组件',
    weigets: [
      {
        name: 'Button',
        render: ()=>(<span>123</span>)
      }
    ]
  },
  {
    title: "form表单",
    weigets: [
      {
        name: 'Input',
      },
      {
        name: "Checkbox",
      },
      {
        name: "Switch",
      }
    ]
  }
]

let getComponents = (() =>{
  let components: Array<any> = []
  components = dataSource.reduce((total: Array<any>, item)=>{
    return [...total, ...item.weigets]
  }, [])
  return ()=>components
})()
export function getComponentByName(name:string) {
  return getComponents().find(item=>item.name == name)
}
