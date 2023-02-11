export default {
  path: "/navigate",
  redirect: "/navigate/index",
  meta: {
    icon: "pepicons-print:arrow-up-right",
    title: "导航管理",
    // 导航栏渲染排序
    rank: 2
  },
  children: [
    {
      path: "/navigate/index",
      name: "nav",
      component: () => import("@/views/navigate/index.vue"),
      meta: {
        title: "导航管理"
      }
    }
  ]
} as RouteConfigsTable;
