import globalComp from './components'
import globalUtils from './utils'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.sass'

createApp(App)
  .use(store)
  .use(router)
  .use(globalComp)
  .use(globalUtils)
  .mount('#app')
