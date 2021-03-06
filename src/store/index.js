import Vue from 'vue'
import Vuex from 'vuex'
import { TYPES } from '@/types'
import saveStatePlugin from '@/plugins/saveState'

Vue.use(Vuex)

const tasks = JSON.parse(localStorage.getItem(TYPES.TASKS) || '[]').map(task => {
  if (new Date(task.date) < new Date()) {
    task.status = TYPES.OUTDATED
  }
  return task
})

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    tasks,
    locale: localStorage.getItem(TYPES.LOCALE) || 'en-US'
  },
  mutations: {
    createTask(state, task) {
      const status = new Date(task.date) > new Date() ? TYPES.ACTIVE : TYPES.OUTDATED
      state.tasks.push({...task, status})
    },
    updateTask(state, { id, title, date, description }) {
      const index = state.tasks.findIndex(t => t.id === id)
      const task = state.tasks[index]

      let status = task.status
      if (status !== TYPES.COMPLETED) {
        status = new Date(date) > new Date() ? TYPES.ACTIVE : TYPES.OUTDATED
      }
      state.tasks[index] = {...task, title, date, description, status}
    },
    completeTask(state, { id } ) {
      const index = state.tasks.findIndex(t => t.id === id)
      state.tasks[index].status = TYPES.COMPLETED
    },
    setLocale(state, locale) {
      state.locale = locale
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task)
    },
    updateTask({ commit }, toUpdate) {
      commit('updateTask', toUpdate)
    },
    completeTask({ commit }, { id }) {
      commit('completeTask', { id })
    },
    setLocale({ commit }, locale) {
      commit('setLocale', locale)
    }
  },
  getters: {
    taskById(state) {
      return id => state.tasks.find(val => val.id === +id)
    },
    tasksNearDeadline(state) {
      return state.tasks.filter(task => (
        task.status === TYPES.ACTIVE
      ))
    },
    tasksSorted(state) {
      const tasks = state.tasks
      tasks.sort((a, b) => {
        return(new Date(b.date) - new Date(a.date))
      })
      return tasks
    }
  },
  modules: {
  }
})
