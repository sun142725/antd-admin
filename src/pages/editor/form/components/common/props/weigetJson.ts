export default [
  {
    id: '1', // 控件ID
    category: 'base',
    edit: [
      //  // key：表单name，name: 表单label, type: 表单类型
      { key: 'label', name: 'label', type: 'Text' },
      { key: 'placeholder', name: 'placeholder', type: 'Text' },
      { key: 'required', name: '是否必填', type: 'Switch' },
      { key: 'help', name: '提示语', type: 'Text' },
    ],
    config: {
      label: '每天最多参与次数',
      name: 'limit_daily',
      placeholder: '请输入每天最多参与次数',
      required: true,
      defaultValue: '',
      help: '',
    },
  },
  {
    id: '2', // 控件ID
    category: 'base',
    edit: [
      //  // key：表单name，name: 表单label, type: 表单类型
      { key: 'label', name: 'label', type: 'Text' },
      { key: 'placeholder', name: 'placeholder', type: 'Text' },
      { key: 'required', name: '是否必填', type: 'Switch' },
      { key: 'help', name: '提示语', type: 'Text' },
    ],
    config: {
      label: '每人每天中奖次数',
      name: 'win_daily_times',
      placeholder: '请输入每人每天中奖次数',
      required: true,
      defaultValue: '',
      help: '',
    },
  },
  {
    id: '3', // 控件ID
    category: 'base',
    edit: [ //  // key：表单name，name: 表单label, type: 表单类型
      { key: 'label', name: '广告开关label', type: 'Text' },
      { key: 'showFlag', name: '是否展示广告开关', type: 'Switch' },
      {
        key: 'showTypeList', name: '广告类型label', type: 'CheckBox', option: [
          { title: "广告语", value: "slogan" },
          { title: "广告图", value: "pic" },
          { title: "h5", value: "h5" },
          { title: "小程序", value: "miniprogram"}
        ]
      },
      { key: 'sloganLabel', name: '广告语label', type: 'Text' },
      { key: 'picLabel', name: '广告图label', type: 'Text' },
      { key: 'picRequired', name: '是否必填', type: 'Switch' },
      { key: 'picHelp', name: '广告图片提示', type: 'Text' },
      { key: 'h5Label', name: 'h5Label', type: 'Text' },
      { key: 'h5Required', name: 'h5链接是否必填', type: 'Switch' },
      { key: 'h5Help', name: 'h5提示', type: 'Text' },
      { key: 'miniLabel', name: '小程序label', type: 'Text' },
      { key: 'miniRequired', name: '小程序链接是否必填', type: 'Switch' },
      { key: 'miniHelp', name: '小程序提示', type: 'Text' },
    ],
    config: {//展示属性相关
      showFlag: true,
      showTypeList: ["slogan", "h5"], // 配置广告内容
      label: "广告图",
      flagName: 'is_open',
      sloganLabel: "广告语",
      sloganName: "adv_context",
      picLabel: "广告图图片",
      picName: "adv_img",
      picRequired: true,
      picHelp: "建议尺寸：750*120或等比图片",
      h5Label: "H5跳转",
      h5Name: "h5_url",
      h5Required: false,
      h5Help: "如不填，则点击后无法跳转。",
      miniLabel: "小程序跳转",
      miniName: "miniprogram_url",
      miniRequired: false,
      miniHelp: "活动小程序中，广告图无法跳转H5链接，如不填，则点击后无法跳转。"
    }
  }
]
