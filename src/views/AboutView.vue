<template>
  <div class="about">
    
    <!-- <h1>Weather Service</h1> -->
    <div class="flex justify-center">
      <div class="mb-3 xl:w-96 px-6 mt-24 xl:mt-0">
        <label for="exampleText0" class="form-label inline-block mb-2 text-gray-700">Enter a City</label>
        <input v-model="city" @keydown.enter="getFiveDays" type="text"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleText0" placeholder="City" />
      </div>
    </div>
    <div  v-if="isLoad" class="max-w-lg p-8 mx-auto mt-4 flex justify-center items-center">
        <svg class="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"></path>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
    <div v-if="data" class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col bg-gradient-to-t from-gray-400 rounded-xl p-4 w-full max-w-xs mx-2">
        <div class="font-bold text-xl">{{ data.name }}, {{ data.sys.country }}</div>
        <div class="text-sm text-gray-500">{{ $filters.timeAgo(Date.now()) }}</div>
        <div
          class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
          <img :src="'http://openweathermap.org/img/wn/' + icon_weather + '@2x.png'" alt="icon-weather" />
        </div>
        <div class="flex flex-row items-center justify-center mt-6">
          <div class="font-medium text-6xl">{{ Math.trunc(data.main.temp) }}°</div>
          <div class="flex flex-col items-center ml-6">
            <div>{{ data.weather[0].main }}</div>
            <div class="text-gray-500 text-xs capitalize">{{ data.weather[0].description }}</div>
            <div class="mt-1">
              <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
              <span class="text-sm font-light text-gray-500">{{ Math.trunc(max) }}°C Max</span>
            </div>
            <div>
              <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
              <span class="text-sm font-light text-gray-500">{{ Math.trunc(min) }}°C Min</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-6">
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Wind</div>
            <div class="text-sm text-gray-500">{{ Math.trunc(data.wind.speed * 3.6) }}k/h</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Humidity</div>
            <div class="text-sm text-gray-500">{{ data.main.humidity }}%</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Visibility</div>
            <div class="text-sm text-gray-500">{{ data.visibility / 1000 }}km</div>
          </div>
        </div>
        <div class="flex justify-between mt-8 space-x-2">
          <div v-for="day in days" :key="day.id" class="flex flex-col items-center space-y-1">
            <span class="uppercase">{{ $filters.nameDay(day.dt)}}</span>
            <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="icon-weather" />
            <span class="text-xs">{{Math.trunc(day.temp.min)}}°/{{Math.trunc(day.temp.max)}}°</span>
          </div>
        </div>
      </div>
      
    </div>
    <!-- no hay datos -->
    <div v-if="errors.length != 0" class="max-w-lg p-8 mx-auto rounded-2xl mt-8 bg-gradient-to-t from-gray-400 text-gray-900 justify-center">
      <div class="flex md:justify-end -mt-16">
        <img class="w-15 h-16 object-fit rounded-md" src="../assets/warning-icon.png" />
      </div>
      <div>
        <h2 class="text-slate-800 text-3xl font-semibold">Opss!!</h2>
        <p class="mt-2 text-slate-600" v-if="errors.data.cod == 404">{{errors.data.message}} for name <span class="font-bold">"{{city}}"</span> </p>
        <p v-else-if="errors.data.cod == 400">Warning!!! The field city is required</p>
        <p v-else>Algo salio max</p>
      </div>
    </div> 
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>

import api from "../url/api";
export default {
  data: function () {
    return {
      city: "",
      icon_weather: "",
      data: "",
      lat:"",
      lon:"",
      days:[],
      today: {},
      isLoad:false,
      setTimeoutBuscador: "",
      timeOut: 300,
      errors: [],
      max:"",
      min:""
    };
  },
  methods: {
    getData: async function () {
        await api.get(`/data/2.5/weather?q=${this.city}`).then(response => {
          this.data = response.data
          this.lat = this.data.coord.lat
          this.lon = this.data.coord.lon
          this.icon_weather = this.data.weather[0].icon
          this.isLoad = false
        }).catch(error => {
          this.errors = error.response
          this.isLoad = false
        })
    },
    getFiveDays: async function() {
      this.isLoad = true
      this.resetData();
      await this.getData();
      clearTimeout(this.setTimeoutBuscador);
      this.setTimeoutBuscador = setTimeout(() => {
        api.get(`/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,minutely,hourly`).then( response => {
          const data = response.data
          const today = data.daily[0]
          this.max = today.temp.max
          this.min = today.temp.min
          this.days = data.daily.slice(1, 6)
        })
      }, this.timeOut);
      
      
      this.isLoad = false

    },
    resetData: function(){
      this.data = '';
      this.errors = [];
    }
  }
};
</script>
