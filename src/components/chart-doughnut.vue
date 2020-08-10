<template>
  <div id="card">
    <div id="column1">
    <div class="chart1">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
     </div>
     <div class="chart2">
      <chartjs-bar
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option1"
      />
    </div>
    </div>
    <div id="column2">
      <div class="chart3">
      <chartjs-line
        :bind="true"
        :datasets="datasets1"
        :labels="labels1"
        :option="option1"
      />
      </div>
      <div class="info1">Ukupno reakcija: {{this.Stats.temp.reduce(function(acc, val) { return acc + val; }, 0)}}</div>
      <div class="chart3">Najčešća reakcija: {{this.mostCommonReaction()}}</div>
      <div class="info2">Zadovoljstvo klijenata: {{this.succesRate() +'%'}}</div>
  </div>
  <div class="chart1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. At beatae, dolore minus magni in quisquam suscipit. Amet doloribus dignissimos assumenda numquam. Nulla molestias beatae quibusdam minima corrupti in. Odit, impedit!</div>
  </div>
</template>

<script>
 import Services from '../services/api';
 import { mapGetters, mapActions } from 'vuex';
export default {
  sockets: {
    // Socket.io listening for server emit after client sends reaction.
    INSERTION() {
      this.change = this.change + 1;
      this.statistics();
    }
  },
  async created()
    {
      // Calling statistics method when component is created.
      this.statistics();
      this.statisticsHour();
      this.datasets[0].data = this.Stats.temp
   },
  methods:{
    ...mapActions([ // calling mutation that will update stats in vuex.
      'getStatisticsAction',
      'getStatisticsHourAction'
      ]),
    // Method that parse date before it is being processed to backend.
    parseDate: function(){
      let date = new Date().toJSON().slice(0,10).replace(/-/g,'');
      return date; 
      },
    // Method that updates current dataset of chart.
    async statistics() {
      this.getStatisticsAction(await Services.getReport(this.Token,this.parseDate()))      //installing data to chart
      },
    async statisticsHour(){
      this.getStatisticsHourAction(await Services.Bydate(this.Token,this.parseDate()))
    },
    // Method that parses response date from backend.
    parseData(){
      let sum = 0;
      let array = [];
      for(let i=1;i<=5;i++){
        //sum = this.Stats[`${i}`].reduce(function(acc, val) { return acc + val; }, 0);
        sum = this.Stats.temp.reduce(function(acc, val) { return acc + val; }, 0);
        array.push(sum);
      }
      return array;
    },
    // Method that calculates success rate of current reactions in system.
    succesRate(){
      let result = []
      let array = this.Stats.temp //this.parseData();
      for(let i=0;i<array.length;i++){
        result.push(array[i]*(array.length-i));
      }
      let num = result.reduce(function(acc, val) { return acc + val; }, 0);
      if(num < 100){
        result = (num / array.length) * 10;
      }else result = (num / array.length);
      return result;
    },
    // Method that calculates most common reaction sent by users.
    mostCommonReaction(){
      let res = Math.max.apply(null, this.Stats.temp);
      let index = this.Stats.temp.indexOf(res);
      switch(index){
        case 0: return 'Excelent';
        case 1: return 'Very good';
        case 2: return 'Good';
        case 3: return 'Pass';
        case 4: return 'Fail';
      }
    }
  },
  watch: {
    Stats: function(){
        this.datasets[0].data = this.Stats.temp //this.parseData()
    },
    hourStats: function(){
        this.datasets1[0].data= this.hourStats.temp['1']
        this.datasets1[1].data= this.hourStats.temp['2']
        this.datasets1[2].data= this.hourStats.temp['3']
        this.datasets1[3].data= this.hourStats.temp['4']
        this.datasets1[4].data= this.hourStats.temp['5']
    }
  },
  data() {
    return {
      change: 0,
      datasets:[
        {
         data:[],  // data sets that will be displayed via chart
          backgroundColor: ["#85f24b", "#d4de4e", "#e89f4d","#3437eb","#eb34eb"], // background-colors of chart
          hoverBackgroundColor: ["#53ad23", "#99ad11", "#c2731b","#d1d1fa","#fad1fa"] // hover background-color of chart
        }
      ],
      datasets1:[
        {
         data:[],  // data sets that will be displayed via chart
          backgroundColor: ["#85f24b"], // background-colors of chart
          hoverBackgroundColor: ["#53ad23"] // hover background-color of chart
        },
        {
          data:[],
          backgroundColor:["#d4de4e"],
          hoverBackgroundColor:["#99ad11"],

        },
        {
          data:[],
          backgroundColor:["#e89f4d"],
          hoverBackgroundColor:["#c2731b"],

        },
        {
          data:[],
          backgroundColor:["#3437eb"],
          hoverBackgroundColor:["#d1d1fa"],

        },
        {
          data:[],
          backgroundColor:["#eb34eb"],
          hoverBackgroundColor:["#fad1fa"],

        }
      ],
      labels1: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"],
      labels: ["Excelent", "Very good", "Good","Pass","Fail"], // labels - legends
      option: {        
        legend: {
             labels: {
                  fontColor: 'white'
            }
      }    
      },
      option1: {
        legend: {
            display: false
        },
        scales: {
        yAxes: [{
          gridLines: {
            color: 'white',
            zeroLineColor:'white'
          },
            ticks: {
                fontColor: 'white',
                beginAtZero: true
            }
        }],
        xAxes: [{
          gridLines: {
            color: 'white',
            zeroLineColor:'white'
          },
          ticks: {
            fontColor: 'white',

          }
        }]
      }
      }
    };
  },
      computed: {
      ...mapGetters({
        Token : 'get_token',
        Stats: 'get_statistics',
        hourStats: 'get_statisticsHour'
   }),
  },
}
</script>
<style scoped>
#card {
  display: flex;
  justify-content: flex-start;
  width: 70vw;
  padding: 2vw;
}
#column1 {
  justify-items: left;
}
#column2 {
  justify-items: left;
}
.chart1{
  margin:2vh auto;
  width: 20vw;
  padding: 1vw;
  background-color: rgba(94, 99, 201, 0.7);
  border-radius: 10px;
}
.chart2{
  padding: 1vw;
  background-color: rgba(144, 94, 201, 0.7);
  border-radius: 10px;
}
.chart3{
  display: flex;
  width: 20vw;
  padding: 1vw;
  margin: 2vh;
  background-color: rgba(142, 201, 94, 0.7);
  border-radius: 10px;
}
.info1{  
  display: flex;
  width: 20vw;
  padding: 1vw;
  margin: 2vh;
  border-radius: 10px;
  background-color: rgba(94, 99, 201, 0.7);
}
.info2{  
  display: flex;
  width: 20vw;
  padding: 1vw;
  margin: 2vh;
  border-radius: 10px;
  background-color: rgba(201, 133, 94, 0.7);
}
</style>
