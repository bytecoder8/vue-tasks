import Vue from 'vue'
import Vuex from 'vuex'
import { TYPES } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = TYPES.OUTDATED
      }
      return task
    })
  },
  mutations: {
    createTask(state, task) {
      const status = new Date(task.date) > new Date() ? TYPES.ACTIVE : TYPES.OUTDATED
      state.tasks.push({...task, status})
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, { id, title, date, description }) {
      const index = state.tasks.findIndex(t => t.id === id)
      const task = state.tasks[index]

      let status = task.status
      if (status !== TYPES.COMPLETED) {
        status = new Date(date) > new Date() ? TYPES.ACTIVE : TYPES.OUTDATED
      }
      state.tasks[index] = {...task, title, date, description, status}
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, { id } ) {
      const index = state.tasks.findIndex(t => t.id === id)
      state.tasks[index].status = TYPES.COMPLETED
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
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
    }
  },
  getters: {
    taskById(state) {
      return id => state.tasks.find(val => val.id === +id)
    }
  },
  modules: {
  }
})
