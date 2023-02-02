<template>
  <div class="about">
    
    <!-- <h1>Weather Service</h1> -->
    <div class="flex justify-center">
      <div class="mb-3 xl:w-96">
        <label for="exampleText0" class="form-label inline-block mb-2 text-gray-700">Enter a City</label>

        <input v-model="city" @keydown.enter="getFiveDays" type="text"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleText0" placeholder="City" />
      </div>
    </div>
    <div v-if="data" class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col bg-gray-100 rounded p-4 w-full max-w-xs mx-2">
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
              <span class="text-sm font-light text-gray-500">{{ Math.trunc(today.temp.max) }}°C Max</span>
            </div>
            <div>
              <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
              <span class="text-sm font-light text-gray-500">{{ Math.trunc(today.temp.min) }}°C Min</span>
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
            <div class="text-sm text-gray-500">{{ today.humidity }}%</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Visibility</div>
            <div class="text-sm text-gray-500">{{ data.visibility / 1000 }}km</div>
          </div>
        </div>
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
// const api_key = "914fd6c8f79b12a26fb4de63fe64d4d2";
// const base_url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;
// import axios from "axios";
export default {
  data: function () {
    return {
      city: "",
      icon_weather: "",
      data: "",
      lat:"",
      lon:"",
      days:[],
      today: {}
    };
  },
  methods: {
    getData: async function () {
        await api.get(`/data/2.5/weather?q=${this.city}`).then(response => {
          console.log(response.data)
          this.data = response.data
          this.lat = this.data.coord.lat
          this.lon = this.data.coord.lon
          this.icon_weather = this.data.weather[0].icon
        })
    },
    getFiveDays: async function() {
      await this.getData();
      api.get(`/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,minutely,hourly`).then( response => {
        const data = response.data
        this.today = data.daily[0]
        this.days = data.daily.slice(1, 6)
        this.icon_weather = this.today.weather[0].icon
        console.log(this.today)
        console.log(this.days)



      })

    }
  },
};
</script>
