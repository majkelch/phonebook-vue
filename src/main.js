import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import '@/assets/styles/phonebook-vue.scss'

import App from './App.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
