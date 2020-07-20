<template>
  <div class="background">
    <div class="searchArea">
       <input
      class="input-el"
      type="number"
      v-model="date.day"
      placeholder="dd">
    <span class="tag">/</span>
    <input
      class="input-el"
      type="number"
      v-model="date.month"
      placeholder="mm">
    <span class="tag">/</span>
    <input
      class="input-el"
      type="number"
      v-model="date.year"
      placeholder="yyyy">
      <button class="button" @click="send()">Search</button>
    </div>
    <div class="chartArea" v-if="search">
      <chart/>
    </div>
    {{date}}
    {{stats}}
  </div>
</template>


<script>
import Services from './../services/api'
import { mapGetters,mapActions } from "vuex";
import chart from './../components/chart-reports';
export default {
  name: 'reports',
  components: {
    chart,
  },
    data () {
    return {
      search: true,
      date: {
        day: 25,
        month: 6,
        year: 2020
      }
    }
  },
   computed: {
    ...mapGetters({
      Token: 'get_token',
      stats: 'get_statistics'
    })
  },
  methods: {
     parseDate: function(){
      let date = ""+this.date.year+this.date.month+this.date.day;
      console.log(parseInt(date),typeof(date))
      return date;
      },
       ...mapActions([ // calling mutation that will update stats in vuex.
        'getStatisticsAction'
      ]),
      async send(){
         this.getStatisticsAction(await Services.getReport(this.Token,this.parseDate()))
         this.search = true;
         console.log(this.parseDate());
           },
  },
  created(){
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  overflow: hidden;
  color:#FBEEC1
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.searchArea {
  display: inline-flex;
  align-items: center;
  justify-content:stretch;
}
.input-el{
  text-align: center;
  color: white;
  width: 50px;
  background-color: transparent;
  border-style: hidden;
  border-bottom: 2px solid rgba(76, 127, 221, 0.89);
}
.tag {
  font-size: small;
  background-color: transparent;
  outline: none;
  color: rgba(76, 127, 221, 0.89);
  margin: auto 5vh;
}
.button
{
  padding: 10px;
  width: 100px;
  height: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
  0 1px 1px rgba(32, 32, 32, 0.155),
  0 2.1px 2.1px rgba(32, 32, 32, 0.195),
  0 4.4px 4.4px rgba(32, 32, 32, 0.241),
  0 5px 5px rgba(32, 32, 32, 0.35);
  outline:none;
  margin: 1vh 5vh;
} 
.button:hover {
  background-color: rgba(28, 110, 164, 0.7);
}
</style>
