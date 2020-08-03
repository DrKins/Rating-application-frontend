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
    <button class="button" v-bind:class="{ buttonActive: inactive, red: fail, green: succ }" type="button" @click="send(); inactive=!inactive;">
     <span v-bind:class="{ none: inactive}">{{loginText}}</span>
     <span class="gg-close" v-bind:class="{ none: !fail}"></span>
     <span class="gg-check" v-bind:class="{ none: !succ}"></span>
     </button>
    </div>
    <span class="error" v-bind:class="{ none: err=== -1 || err=== 0}">{{errMsg}}</span>
    <div class="chartArea" v-if="search">
      <chart/>
    </div>
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
      },
      inactive: false,
      loginText: 'Search',
      succ: false,
      fail: false,
      err:0,
      errMsg: "Došlo je do pogreške."          
    }
  },
   computed: {
    ...mapGetters({
      Token: 'get_token',
      stats: 'get_statistics'
    })
  },
  methods: {
    // Method that parse date before it is being processed to backend.
     parseDate: function(){
      this.date.month = ('0' + this.date.month).slice(-2)
      this.date.day = ('0' + this.date.day).slice(-2)
      let date = ""+this.date.year+this.date.month+this.date.day;
      console.log(parseInt(date),typeof(date))
      return date;
      },
       ...mapActions([ // calling mutation that will update stats in vuex.
        'getStatisticsAction'
      ]),
      // Method that sends date to backend and gets proper statistics that will be shown via charts.
      async send(){
         this.getStatisticsAction(await Services.getReport(this.Token,this.parseDate()))
         this.search = true;
         this.err = -1;
         console.log(this.parseDate());
           },
      // Method that will restart animation after fail or success.
      restartInactive() {
        if(this.err === -1) {this.succ = true;}
        else {this.fail = true; this.err=this.err+1; this.search = false;}
        setTimeout(()=>{
        this.succ=false;
        this.fail=false;
        this.inactive=false;
      },2000);
     }
  },
    watch: {
     // Watching inactive variable - button spining.
     inactive: function() {
       if(this.inactive == true) {
        this.loginText='';
        setTimeout(this.restartInactive, 2500);
       }
       else this.loginText='Search';
     }
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
.buttonActive{
  transition: ease-in 500ms;
  padding: 10px;
  width: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  box-shadow: 1px 1px 10px rgba(32, 32, 32, 0.109),
  1px 1px 10px rgba(32, 32, 32, 0.155),
  1px 1px 10px rgba(32, 32, 32, 0.195),
  1px 1px 10px rgba(32, 32, 32, 0.241),
  1px 1px 10px rgba(32, 32, 32, 0.35);
  cursor: default;
  animation: loading-rotation 3s ease 500ms normal;
  outline:none;
}
.gg-close {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 40px;
    margin:auto auto;
}
.gg-close::after,
.gg-close::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 1px
}
.gg-close::after {
    transform: rotate(-45deg)
}
.gg-check {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    margin: auto auto;
    transition: ease-in 250ms;
}
.gg-check::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px;
    top: -1px;
    width: 6px;
    height: 10px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    transform-origin: bottom left;
    transform: rotate(45deg)
}
.red {
  background-color: #df775d;
}
.error{
  transition: ease-in 500ms;
  color:#df775d;
  font-size: small;
}
.green {
  background-color: #5ddf8f;
}
.none {
  display:none;
}
@keyframes loading-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
