<template>
  <div class="background">
    <div id="column1">
      <div class="row1">
        <DatePicker
        v-model="date" />
      </div>
      <div class="row2">
        <button class="button" v-bind:class="{ buttonActive: inactive, red: fail, green: succ }" type="button" @click="send(); inactive=!inactive;">
          <span v-bind:class="{ none: inactive}">{{loginText}}</span>
          <span class="gg-close" v-bind:class="{ none: !fail}"></span>
          <span class="gg-check" v-bind:class="{ none: !succ}"></span>
        </button>
      </div>
    </div>
    <div id="column2">
      <div id="column2-0" v-bind:class="{ none: search }" >Please enter date and click on button!</div>
      <div id="column2-1" v-if="search"><chart/></div>
    </div>
  </div>
</template>


<script>
import Services from './../services/api'
import { mapGetters,mapActions } from "vuex";
import chart from './../components/chart-reports';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
export default {
  name: 'reports',
  components: {
    chart,
    DatePicker
  },
    data () {
    return {
      search: false,
      date: new Date("2020-08-05"),
      inactive: false,
      loginText: 'Search',
      succ: false,
      fail: false,
      err:0,        
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
      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
      const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(this.date) 
      let date = ""+year+month+day;
       return date; 
      },
       ...mapActions([ // calling mutation that will update stats in vuex.
        'getStatisticsAction'
      ]),
      // Method that sends date to backend and gets proper statistics that will be shown via charts.
      async send(){
        this.search = true;
        this.getStatisticsAction(await Services.getReport(this.Token,this.parseDate()))
        this.err = -1;
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
  display:flex;
  flex-direction: column;
  height: 70vh;
}
#column1 {
  display: flex;
  flex-direction: row;
  align-self: center;
  background-color: rgba(28, 110, 164, 0.2);
  border-radius: 10px;
  margin-top: 1.5em;
}
#column2-0{margin-top:5rem;}
#column2 {
  align-self: center;
}
/* Graph id and animations */
#column2-1{
  
  align-self: center;
  -webkit-animation:slide-in-bottom 3s cubic-bezier(.55,.085,.68,.53) both;animation:slide-in-bottom 3s cubic-bezier(.55,.085,.68,.53) both
}

@-webkit-keyframes slide-in-bottom{0%{-webkit-transform:translateY(1000px);transform:translateY(1000px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@keyframes slide-in-bottom{0%{-webkit-transform:translateY(1000px);transform:translateY(1000px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}
.row1{
  margin: 1vw;
}
.row2{
  margin: 1vw;
}

/* CSS for button */
.button
{
  padding: 10px;
  width: 100px;
  height: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  outline:none;
}
.buttonActive{
  transition: ease-in 500ms;
  padding: 10px;
  width: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  cursor: default;
  animation: loading-rotation 3s ease 500ms normal;
  outline:none;
  pointer-events: none;
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
@media screen and (max-height: 450px) and (orientation: landscape){
  .chart1{
    display:none;
  }
  #column1{
    justify-content: center;
  }
}
@media screen and (max-width: 600px) {
  #column1 {
    display: flex;
    flex-direction: row;
    justify-items: center;
    background-color: rgba(28, 110, 164, 0.2);
    border-radius: 10px;
    margin-top: 1.5rem;
    padding:10px;
  }
  .button
  {
    padding:0;
    width: 50px;
    height: 50px;
    border: 2px inset rgb(28, 110, 164);
    border-radius: 50px;
    background-color: transparent;
    color: white;
    outline:none;
    font-size: 0.5rem;
  }
  .buttonActive{
    transition: ease-in 500ms;
    padding: 10px;
    width: 50px;
    border: 2px inset rgb(28, 110, 164);
    border-radius: 50px;
    background-color: transparent;
    color: white;
    cursor: default;
    animation: loading-rotation 3s ease 500ms normal;
    outline:none;
    pointer-events: none;
  }
  .row2{
    padding:5vw;
  }
  .row1{
    margin-top: 4vh;
  }
}
@media (hover: hover) {
  .button:hover {
    background-color: rgba(28, 110, 164, 0.7);
  }
}
</style>
