import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: 'Wake up',
      //   done: false,
      //   dueDate: '2022-01-20'
      // },
      // {
      //   id: 2,
      //   title: 'Get bananas',
      //   done: false,
      //   dueDate: '2022-01-23'
      // },
      // {
      //   id: 3,
      //   title: 'Work out',
      //   done: false,
      //   dueDate: null
      // },
    ],
    snackbar: {
      show: false,
      text: '',
      color: '',
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      let newTasks = state.tasks.filter(task => task.id !== id)
      state.tasks = newTasks
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    showSnackbar(state, {text, color}) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
        state.snackbar.color = color
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask= {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(()=> {
        commit('addTask', newTask)
        commit('showSnackbar', {text: 'Task Added!', color: 'success'})
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('showSnackbar', {text: 'Task Deleted!', color: 'red'})
        commit('deleteTask', id)
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('showSnackbar', {text: 'Task Updated!', color: 'primary'})
        commit('updateTaskTitle', payload)
      })
    },
    updateDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('showSnackbar', {text: 'Due Date Set!', color: 'primary'})
        commit('updateDueDate', payload)
      })
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter( task =>
        task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  }
})
