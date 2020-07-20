<template>
  <div id="card">
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
// import Services from '../services/api';
 import { mapGetters } from 'vuex';

export default {
    watch: {
      Payload: function(){
        this.datasets[0].data = this.Payload
      }
    },
  data() {
    return {
      datasets:[
        {
         data:[],  // niz vrijednosti koje ispisuje na chartu
          backgroundColor: ["#85f24b", "#d4de4e", "#e89f4d","#3437eb","#eb34eb"], // pozadniske boje pie charta
          hoverBackgroundColor: ["#53ad23", "#99ad11", "#c2731b","#d1d1fa","#fad1fa"] // isto boje charta
        }
      ],
      labels: ["Excelent", "Very good", "Good","Pass","Fail"], //labelovi legende
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
        Payload : 'get_statistics',
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
