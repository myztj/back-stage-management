import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/index')
      },
      {
        path: 'advert',
        name: 'advert',
        component: () => import('../views/advert/advert')
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('../views/blog/blog'),
        children: [
          {
            path: 'article',
            name: 'article',
            component: () => import('../views/blog/article')
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('../views/blog/category')
          },
          {
            path: 'label',
            name: 'label',
            component: () => import('../views/blog/label')
          }
        ]
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('../views/blog/blog'),
        children: [
          {
            path: 'user',
            name: 'user',
            component: () => import('../views/system/user')
          },
          {
            path: 'role',
            name: 'role',
            component: () => import('../views/system/role')
          },
          {
            path: 'menu',
            name: 'menu',
            component: () => import('../views/system/menu')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
