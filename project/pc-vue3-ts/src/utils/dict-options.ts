// 字典与选项映射

// 2个数组遍历匹配给config添加选项
export const mapDictToOptions = (configList: any[], descList: any[]): void => {
  configList.forEach((item) => {
    if (item.type !== 'select') {
      return
    }
    const propValue = item.label
    // 在第二个数组中,type要是select,然后才匹配
    const matchingObj2 = descList.find((obj2) => obj2.type_name === propValue)
    // 找到匹配的对象,从这个对象里提取children,将所有选项直接使用push到options中
    const children = matchingObj2?.children
    if (children) {
      item.options = []
      children.forEach((child) => {
        // console.log('匹配结果', child)
        // 根据需要调整格式，然后加入数组中
        const formatOptions = {
          id: child.content_id,
          label: child.label,
          value: child.value
        }
        if (item.options) {
          // 清空添加新的
          item.options.push(formatOptions)
        }
      })
    }
  })
}
// option匹配添加 、
export const mapOptions = (configList: any[], dataList: any[]): void => {
  configList.forEach((item) => {
    if (item.type !== 'select') {
      return
    }
    // 如果item的prop跟dataList的一致，就添加进item
    item.options = []
    dataList.forEach((data) => {
      if (item.prop === data.prop) {
        item.options.push({
          id: data.id,
          label: data.name,
          value: data.id
        })
      }
    })
  })
}
