<template>
  <div id="card">
    <div id="column1">
    <div class="chart1">
      <chartjs-doughnut
        :bind="true"
        :datasets="datacollection1.datasets"
        :labels="datacollection1.labels"
        :option="optionsDoughnut"
      />
     </div>
     <div class="chart2">
      <chartjs-bar
        :bind="true"
        :datasets="datacollection1.datasets"
        :labels="datacollection1.labels"
        :option="optionsBar"
      />
    </div>
    <div class="info5">The busiest hour: {{this.mostTraffic().hour}}:00</div>
    </div>
    <div id="column2">
      <div class="chart3">
      <chartjs-line
        :bind="true"
        :datasets="datacollection.datasets"
        :labels="datacollection.labels"
        :option="options"
      />
      </div>
      <div class="info1">Total reactions: {{this.Stats.temp.reduce(function(acc, val) { return acc + val; }, 0)}}</div>
      <div class="info3">Most common reaction: {{this.mostCommonReaction()}}</div>
      <div class="info4">Happiness: {{this.succesRate() +'%'}}</div>
      <div class="info2">Count of most common reaction: {{this.mostTraffic().emo}}</div>
    </div>
  </div>
</template>

<script>
 import Services from '../services/api';
 import { mapGetters, mapActions } from 'vuex';
export default {
  sockets: {
    // Socket.io listening for server emit after client sends reaction.
    INSERTION() {
      this.statistics();
      this.statisticsHour();
    }
  },
  async created()
    {
      // Calling statistics method when component is created.
      this.statistics();
      this.statisticsHour();
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
    // Method that calculates mostTraffic hour and counts emoticons in that rush hour.
    mostTraffic(){
      let mostTraffic = {emo:0,hour:0};
      for(let i=1;i<=5;i++){
        let temp = Math.max.apply(null, this.hourStats[`${i}`]);
        if(temp>=mostTraffic.emo) {mostTraffic.emo = temp; mostTraffic.hour = this.hourStats[`${i}`].indexOf(mostTraffic.emo);}
      }
      return mostTraffic;
    },
    // Method that calculates success rate of current reactions in system.
    succesRate(){
      let result = []
      let array = this.Stats.temp
      for(let i=0;i<array.length;i++){
        result.push(array[i]*(array.length-i));
      }
      let num = result.reduce(function(acc, val) { return acc + val; }, 0)/this.Stats.temp.reduce(function(acc, val) { return acc + val; }, 0);
      num = (num * 100)/5
      if(isNaN(num)) num = 0;
      return num.toFixed(0);
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
        this.datacollection1.datasets[0].data = this.Stats.temp 
    },
    hourStats: function(){
        this.datacollection.datasets[0].data= this.hourStats['1']
        this.datacollection.datasets[1].data= this.hourStats['2']
        this.datacollection.datasets[2].data= this.hourStats['3']
        this.datacollection.datasets[3].data= this.hourStats['4']
        this.datacollection.datasets[4].data= this.hourStats['5']
    }
  },
  data() {
    return {
      // Datacollection of line-chart that will be represented.
      datacollection: {
                //Data to be represented on x-axis
                labels: ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h','12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
                datasets: [
                  {
                    label: 'Excelent',
                    backgroundColor: '#85f24b',
                    pointBackgroundColor: 'green',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: []
                  },
                  {
                    label: 'Very good',
                    backgroundColor: '#d4de4e',
                    pointBackgroundColor: 'yellow',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: []
                  },
                  {
                    label: 'Good',
                    backgroundColor: '#e89f4d',
                    pointBackgroundColor: 'orange',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: []
                  },
                  {
                    label: 'Pass',
                    backgroundColor: '#3437eb',
                    pointBackgroundColor: 'blue',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: []
                  },
                  {
                    label: 'Fail',
                    backgroundColor: '#eb34eb',
                    pointBackgroundColor: 'purple',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: []
                  },
                ]
              },
      //line-chart options that controls the appearance of the chart3
      options: {
          scales: {
            yAxes: [{
              gridLines: {
                color: 'white',
                zeroLineColor:'white',
              },
              ticks: {
                fontColor: 'white',
                beginAtZero: true,
                precision: 0
              },
            }],
            xAxes: [ {
              gridLines: {
                color: 'transparent',
                zeroLineColor:'transparent'
              },
              ticks: {
                fontColor: 'white',
                beginAtZero: true,
              },
            }]
          },
          legend: {
            display: true,
            labels: {
              fontColor: 'white'
            }
          },
          responsive: true,
          maintainAspectRatio: false
        },
        // Options preset for Doughnut chart.
        optionsDoughnut: {
          scales: {
            yAxes: [{
              display: false,
            }],
            xAxes: [ {
              display: false,
            }]
          },
          legend: {
            display: true,
            labels: {
              fontColor: 'white'
            }
          },
          responsive: true,
          maintainAspectRatio: false
        },
        // Options preset for Bar chart.
        optionsBar: {
          scales: {
            yAxes: [{
              gridLines: {
                color: 'white',
                zeroLineColor:'white',
              },
              ticks: {
                fontColor: 'white',
                beginAtZero: true,
                precision: 0
              },
            }],
            xAxes: [ {
              gridLines: {
                color: 'transparent',
                zeroLineColor:'transparent'
              },
              ticks: {
                fontColor: 'white',
                beginAtZero: true,
              },
            }]
          },
          legend: {
            display: false,
            labels: {
              fontColor: 'white',
            }
          },
          responsive: true,
          maintainAspectRatio: false
        },
      // Datacollection of doughnut and bar charts that will be represented.
      datacollection1: {
          //Data to be represented on x-axis
            labels: ["Excelent", "Very good", "Good","Pass","Fail"],
            datasets: [
            {
              backgroundColor: ["#85f24b", "#d4de4e", "#e89f4d","#3437eb","#eb34eb"], // background-colors of chart
              hoverBackgroundColor: ["#53ad23", "#99ad11", "#c2731b","#d1d1fa","#fad1fa"], // hover background-color of chart
              //Data to be represented on y-axis
              data: []
            },
          ]
        },
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
  display:flex;
  flex-direction: row;
  justify-content:space-around;
  height:70vh;
}
#column1 {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 100%;
}
#column2 {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 100%;
}
.chart1{
  margin:1vw;
  padding: 1vw;
  background-color: rgba(94, 99, 201, 0.7);
  border-radius: 10px;
}
.chart2{
  margin:1vw;
  padding: 1vw;
  background-color: rgba(144, 94, 201, 0.7);
  border-radius: 10px;
}
.chart3{
  margin:1vw;
  padding: 1vw;
  background-color: rgba(142, 201, 94, 0.7);
  border-radius: 10px;
}
.info1{
  margin:auto 1vw;
  padding: 1vw;
  border-radius: 10px;
  background-color: rgba(94, 99, 201, 0.7);
}
.info2{
  margin:auto 1vw;
  padding: 1vw;
  border-radius: 10px;
  background-color: rgba(201, 133, 94, 0.7);
}
.info3{
  margin:auto 1vw;
  padding: 1vw;
  border-radius: 10px;
  background-color: rgba(201, 94, 139, 0.7);
}
.info4{
  margin:auto 1vw;
  padding: 1vw;
  border-radius: 10px;
  background-color: rgba(201, 94, 94, 0.7);
}
.info5{
  margin:1vw;
  padding: 1vw;
  border-radius: 10px;
  background-color: rgba(201, 94, 94, 0.7);
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
  #card {
  display:flex;
  flex-direction: column;
  height:70vh;
  }
  #column1{
    flex-basis: 60%;
  }
  .chart1{
    display:none;
  }
}
</style>
