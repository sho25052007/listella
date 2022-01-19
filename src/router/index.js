import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import About from '../views/About.vue'
import goTo from 'vuetify/lib/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'To-do',
    component: Todo
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${ process.env.VUE_APP_TITLE } | ${to.name}`
  next()
})

router.afterEach((to, from) => {
  goTo(0, { duration: 0 })
})

export default router
