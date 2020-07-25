<template>
  <div id="card" :key="change">
    {{change}}
    <div class="card-img">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
     </div>
     <!-- <span class="line"></span> -->
     <div class="card-img">
      <chartjs-bar
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option1"
      />
    </div>
  </div>
</template>

<script>
 import Services from '../services/api';
 import { mapGetters } from 'vuex';
export default {
  sockets: {
    INSERTION(val) {
      console.log('this method was fired by the socket server. '+val+this.change+' try!');
      this.change = this.change + 1;
      this.statistics();
    }
  },
    // hook(){
    //   if(this.change > 0) {
    //     this.$socket.$subscribe('INSERTION', payload => {
    //     console.log(payload)
    //     });
    //   }
    // },
  async created()
    {
      this.statistics();
      // this.datasets[0].data = await Services.countReactions(this.Token);  
   },
  methods:{
    async statistics() {
      this.datasets[0].data = await Services.countReactions(this.Token);      //installing data to chart
  },
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
   }),
  },
}
</script>
<style scoped>
#card {
  display: flex;
  height: 50vh;
  width: 80vw;
  justify-content:space-evenly;
  align-items: center;
}
.card-img{
  flex-direction: column;
  padding: 25px 25px;
}
</style>
