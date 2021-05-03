import globalComp from './components'
import globalUtils from './utils'
import { createApp } from 'vue'
import router from './router'
import './styles/index.sass'
import App from './App.vue'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .use(globalComp)
  .use(globalUtils)
  .mount('#app')
