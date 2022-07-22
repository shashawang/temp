import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/", // 默认进入路由
    redirect: "/login",
  },
  {
    path: "/home-page",
    name: "home-page",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/home-page"),
  },
  {
    path: `/drone-live`,
    name: "drone-live",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/drone-live"),
  },
  {
    path: '/dispatch-center-desc',
    name: "dispatch-center-desc",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/dispatch-center-desc"),
  },
  {
    path: "/login",
    name: "login",
    // component: resolve => require(['../pages/login'], resolve)  // 路由懒加载方式一
    component: () => import("@/pages/login"),
    // component: () => import("@/pages/login/public-index"),
    // 路由懒加载方式二，需要安装@babel/plugin-syntax-dynamic-import插件
  },
  {
    path: "/cesium-threeD",
    name: "cesium-threeD",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/cesium-threeD"),
  },
  {
    path: "/data-manage",
    name: "data-manage",
    component: () => import("@/pages/resultManage/dataCenter"),
  },
  {
    path: "/data-show",
    name: "dataShow",
    component: () => import("@/pages/resultManage"),
  },
  {
    path: "/air-plan",
    name: "air-plan",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/air-plan"),
  },
  {
    path: "/abnormal-find",
    name: "abnormal-find",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/abnormal-find"),
  },
  {
    path: "/device-manage",
    name: "device-manage",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/device-manage"),
  },
  {
    path: "/device-editable",
    name: "device-editable",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import("@/pages/device-manage/components/editableInfo/index"),
  },
  {
    path: "/system-setup",
    name: "system-setup",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/system-setup"),
  },
  {
    path: "/analyse-center",
    name: "analyse-center",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/analyse-center"),
  },
  {
    path: "/misstionPage",
    name: "misstionPage",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/misstionPage"),
  },
  // {
  //   path: "/data-manage",
  //   name: "data-manage",
  //   meta: {
  //     requireAuth: true,
  //   },
  //   component: () => import("@/pages/data-manage"),
  // },
  {
    path: "/ponit-cloud-desc",
    name: "ponit-cloud-desc",
    meta: {
      requireAuth: true,
    },
    component: () => import("@/pages/ponit-cloud-desc"),
    props: true,
  },
  {
    path: '*', // 错误路由直接到登录页（现在平台没有404页面）
    redirect: '/login'
  }
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

router.beforeEach((to, from, next) => {
  let toName = to.name
  if(to.name == 'dataShow'){
    toName = 'data-manage'
  }else if(to.name == 'analyse-center'){
    toName = 'abnormal-find'
  }
  if (localStorage.getItem("auth")) {
    const subMenu = JSON.parse(localStorage.getItem("auth")).find(
      (item) => item.url === toName
    );
    const childrenList = subMenu ? subMenu.childrenList : [];
    localStorage.setItem("subMenuAuth", JSON.stringify(childrenList));
  }

  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "login"
      });
    }
  } else {
    next();
  }
});

router.afterEach( route => {
  window.document.documentElement.setAttribute( "data-theme", localStorage.getItem('themes') || 'green')
})

export default router;
