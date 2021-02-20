
// 获取枚举
export const getTitleByValue = (dataSource: Map<any,any>, val?: any)=>{
  if(val === undefined){
    return Array.from(dataSource)
  } else {
    return dataSource.get(val)
  }
}

// 账单种类 --- 支出
export const billCategoryType = new Map([
  ["FOOD", "饮食"],
  ["LIVE", "居住"],
  ["TRAFFIC", "交通"],
  ["PLAY", "娱乐"],
  ["USE_HOME", "家居用品"],
  ["CLOTHES", "服饰"],
  ["MAKEUP", "护肤"],
  ["LIFE", "生活缴费"],
  ["OTHER", "其他"],
])
// 账单种类 --- 收入
export const billIncomeCategoryType = new Map([
  ["WAGES", "工资"],
  ["MANAGE_MONEY", "理财"],
  ["OTHER", "其他"],
])
// 账单类型
export const billType = new Map([
  [1, "支出"],
  [2, "收入"],
])
