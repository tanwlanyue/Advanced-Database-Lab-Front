import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/flight',
    component: Layout,
    redirect: '/flight/list',
    name: '宾馆房间管理',
    meta: { title: '航班管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '航班列表',
        component: () => import('@/views/flight/list'),
        meta: { title: '航班列表', icon: 'table' }
      },
      {
        path: 'list/:id',
        name: '航班列表',
        component: () => import('@/views/flight/list'),
        meta: { title: '航班列表', icon: 'table' },
        hidden: true
      },
      {
        path: 'save',
        name: '添加航班',
        component: () => import('@/views/flight/save'),
        meta: { title: '添加航班', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑航班',
        component: () => import('@/views/flight/save'),
        meta: { title: '编辑宾馆房间', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    redirect: '/car/list',
    name: '出租车管理',
    meta: { title: '出租车管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '出租车列表',
        component: () => import('@/views/car/list'),
        meta: { title: '出租车列表', icon: 'table' }
      },
      {
        path: 'list/:id',
        name: '出租车列表',
        component: () => import('@/views/car/list'),
        meta: { title: '出租车列表', icon: 'table' },
        hidden: true
      },
      {
        path: 'save',
        name: '添加出租车',
        component: () => import('@/views/car/save'),
        meta: { title: '添加出租车', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑出租车',
        component: () => import('@/views/car/save'),
        meta: { title: '编辑出租车', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/hotel',
    component: Layout,
    redirect: '/hotel/list',
    name: '宾馆房间管理',
    meta: { title: '宾馆房间管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '宾馆房间列表',
        component: () => import('@/views/hotel/list'),
        meta: { title: '宾馆房间列表', icon: 'table' }
      },
      {
        path: 'list/:id',
        name: '宾馆房间列表',
        component: () => import('@/views/hotel/list'),
        meta: { title: '宾馆房间列表', icon: 'table' },
        hidden: true
      },
      {
        path: 'save',
        name: '添加宾馆房间',
        component: () => import('@/views/hotel/save'),
        meta: { title: '添加宾馆房间', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑宾馆房间',
        component: () => import('@/views/hotel/save'),
        meta: { title: '编辑宾馆房间', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    name: '客户管理',
    meta: { title: '客户管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '客户列表',
        component: () => import('@/views/customer/list'),
        meta: { title: '客户列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加宾馆房间',
        component: () => import('@/views/customer/save'),
        meta: { title: '添加客户', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑客户',
        component: () => import('@/views/customer/save'),
        meta: { title: '编辑客户', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/reservation',
    component: Layout,
    redirect: '/reservation/list',
    name: '预订管理',
    meta: { title: '预订管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '预订管理',
        component: () => import('@/views/reservation/list'),
        meta: { title: '预订管理', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
