import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Advent from './components/Advent.vue'
import Day from './components/Day.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/day/:id', component: Day },
  { path: '/', component: Advent },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
