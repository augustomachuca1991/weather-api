import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
    timeAgo(date) {
      return moment(date).locale("es").format('dddd D MMMM YYYY'); // October 7th 2022, 12:47:58 am
    },
    nameDay(value){
      const day = new Date(value*1000)
      return day.toLocaleDateString("es", { weekday:"short"});
    }
  }

app.use(router)

app.mount('#app')
