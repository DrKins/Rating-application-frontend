<template>
  <div id="container">
    <div id="fail" v-if="zero==true">
      <div>No data available</div>
    </div>
    <div id="success" v-if="zero==false">
      <div class="column1">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
     </div>
     <!-- <span class="line"></span> -->
     <div class="column2">
      <chartjs-bar
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option1"
      />
    </div>
    </div>
  </div>
</template>

<script>
// import Services from '../services/api';
 import { mapGetters } from 'vuex';

export default {
    watch: {
      Payload: function(){
        if((this.Payload.temp.reduce((pv, cv) => pv + cv, 0)) === 0) {
            this.zero = true; 
        }
        else {this.zero = false;}
        this.datasets[0].data = this.Payload.temp
      }
    },
  data() {
    return {
      zero: true,
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
#container {
  display: flex;
  height: 50vh;
  width: 80vw;
  justify-content:space-evenly;
  align-items: center;
}
#success{
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 25px 25px;
  border-radius: 10px;
}
.column1{
  flex-direction: column;
  padding: 25px 25px;
  border-radius: 10px;
  background-color: rgba(28, 110, 164, 0.5);
  margin:1rem;
}
.column2{
  flex-direction: column;
  padding: 25px 25px;
  border-radius: 10px;
  background-color: rgba(28, 164, 135, 0.5);
  margin:1rem;
}
@media screen and (max-height: 450px) and (orientation: landscape){
  .column1{
      display:none;
  }
}
@media screen and (max-width: 600px) {
  #success{
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  }
  .column1{
    display:none;
  }
}
</style>
