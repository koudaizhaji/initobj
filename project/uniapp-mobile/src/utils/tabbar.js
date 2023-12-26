import dataFormatUtils from '@/utils/data-format.js';
// 存储选择的下标，如果是刷新就执行，不是刷新不执行
export function saveSelectIndex() {
  const pages = getCurrentPages();
  // console.log('获取当前页的所有信息', pages[0]);
  // console.log('上一页信息', pages[pages.length - 2]);
  // 上一页的信息 (pages[pages.length - 2])})
  if (pages[pages.length - 2] === undefined) {
    const pageIndex = dataFormatUtils.selectTabbarIndex(pages[0].route);
    // console.log('获取当前页的下标', pageIndex);
    uni.setStorageSync('selectedIndex', pageIndex);
  }
}
