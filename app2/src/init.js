import Vue from 'common/vue'
import App from './App'
import ElementUI from 'common/element-ui'
import 'common/element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
