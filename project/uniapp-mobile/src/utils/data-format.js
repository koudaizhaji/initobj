// 数据格式化函数
import tabbarList from '@/config/tabbar.js';

class DataFormat {
// 通过接收路径，映射返回对应的数字字符串排序
  selectTabbarIndex(path) {
    let selectIndex = 0;
    tabbarList.forEach((item, index) => {
      // console.log('路径匹配', item.pagePath, path, index);
      if (item.pagePath === path) {
        selectIndex = index;
      }
    });
    return selectIndex;
  }
}

export default new DataFormat();
