import { createRouter } from 'uni-mini-router';
// 导入pages.json
import pagesJsonToRoutes from 'uni-parse-pages';
import pagesJson from '../pages.json';
// 引入uni-parse-pages
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson);
const router = createRouter({
  routes: [...routes], // 路由表信息
});
export default router;
