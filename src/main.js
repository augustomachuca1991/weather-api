import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
    timeAgo(date) {
      return moment(date).format('dddd D MMMM YYYY'); // October 7th 2022, 12:47:58 am
    },
  }

app.use(router)

app.mount('#app')
