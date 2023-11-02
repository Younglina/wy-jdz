import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
  {
    path: '/', name: 'Home', component: () => import('@/views/home.vue'), meta: {
      keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,',
      title: '首页',
      icon: 'i-material-symbols-home-outline'
    }
  },
  {
    path: '/users', name: 'Users', component: () => import('@/views/users.vue'), meta: {
      keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '用户',
      icon: 'i-material-symbols-account-circle-outline'
    }
  },
  {
    path: '/areas', name: 'Areas', component: () => import('@/views/areas.vue'), meta: {
      keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '地点',
      icon: 'i-material-symbols-person-play-outline'
    }
  },
  {
    path: '/addArea', name: 'AddArea', component: () => import('@/views/addArea.vue'), meta: {
      keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '新增地点',
    }
  },
  {
    path: '/comment', name: 'Comment', component: () => import('@/views/comment.vue'), meta: {
      keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '评论',
      icon: 'i-material-symbols-comment-outline'
    }
  },
  {
    path: '/login', name: 'Login', component: () => import('@/views/login.vue'), meta: {
      keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '登录',
      icon: 'i-material-symbols-account-circle-outline'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
