export default {
  path: "/category",
  component: () => import("@/views/category/index.vue"),
  meta: {
    //图标: https://yiming_chang.gitee.io/pure-admin-doc/pages/icon/#%E5%9C%A8%E7%BA%BF%E5%9B%BE%E6%A0%87-2
    icon: "pepicons-print:grab",
    title: "分类管理",
    // showLink: false,  // 不在导航栏上显示
    rank: 1
  }
} as RouteConfigsTable;
