import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Task from '../views/Task.vue'
import Create from '../views/Create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Main',
    }
  },
  {
    path: '/create',
    name: 'create',
    component: Create,
    meta: {
      title: 'Create Task'
    }
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      title: 'Tasks List'
    }
  },
  {
    path: '/task/:id',
    name: 'task',
    component: Task,
    meta: {
      title: 'Task Page'
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
