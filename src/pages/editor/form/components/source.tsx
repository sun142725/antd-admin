import { Button, Input, Checkbox, Switch } from 'antd';

export const dataSource = [
  {
    title: '规则组件',
    weigets: [
      {
        id: '1', // 控件ID
        name: "limit_daily",
        desc: "每天最多参与次数",
        logo: "",
        draglogo: "",
      },
    ],
  },
  {
    title: '运营组件',
    weigets: [
      {
        id: '2', // 控件ID
        name: "win_daily_times",
        desc: "每人每天中奖次数",
        logo: "",
        draglogo: "",
      },
      {
        id: '3', // 控件ID
        name: "sloganCom",
        desc: "广告设置组件",
        logo: "",
        draglogo: "",
      },
    ],
  },
  {
    title: "算法组件",
    weigets: [
      {
        id: "calc1",
        name: "随机算法",
        desc: "随机算法",
        logo: "",
        draglogo: ""
      },
      {
        id: "calc2",
        name: "固定概率",
        desc: "适用于大转盘",
        logo: "",
        draglogo: ""
      },{
        id: "calc3",
        name: "阶梯概率",
        desc: "阶梯概率",
        logo: "",
        draglogo: ""
      },{
        id: "calc4",
        name: "合成概率",
        desc: "随机算法",
        logo: "",
        draglogo: ""
      },
    ]
  }
];

let getComponents = (() => {
  let components: Array<any> = [];
  components = dataSource.reduce((total: Array<any>, item) => {
    return [...total, ...item.weigets];
  }, []);
  return () => components;
})();
export function getComponentByName(name: string) {
  return getComponents().find((item) => item.name == name);
}
