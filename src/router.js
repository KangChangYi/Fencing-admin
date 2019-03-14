import Vue from 'vue'
import Router from 'vue-router'
import Navigate from './views/Navigate/Navigate.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: () => import('./views/Login/Login.vue'),
    },
    {
      path: '/Navigate',
      name: 'Navigate',
      component: Navigate,
      children: [{
          path: '/Index',
          name: 'Index',
          component: () => import('./views/Index/Index.vue')
        }, {
          path: '/DailyInfoManage',
          name: 'DailyInfoManage',
          component: () => import('./views/DailyInfo/DailyInfoManage/DailyInfoManage.vue')
        },
        {
          path: '/DailyInfoAdd',
          name: 'DailyInfoAdd',
          component: () => import('./views/DailyInfo/DailyInfoAdd/DailyInfoAdd.vue')
        }, {
          path: '/UserInfoManage',
          name: 'UserInfoManage',
          component: () => import('./views/UserInfo/UserInfoManage/UserInfoManage.vue')
        }
      ]
    }
  ]
})