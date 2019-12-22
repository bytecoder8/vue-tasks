import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Task from '../views/Task.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Главная',
    }
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      title: 'Список задач'
    }
  },
  {
    path: '/task/:id',
    name: 'task',
    component: Task,
    meta: {
      title: 'Страница задачи'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  const appTitle = process.env.VUE_APP_TITLE
  const title = (to.meta && to.meta.title) || 'Страница'
  document.title = `${title} | ${appTitle}`
})

export default router
