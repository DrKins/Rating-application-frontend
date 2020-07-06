<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title"></h2>

    </div>

    <div class="card-img-bottom">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
     </div>
        <div class="card-img-bottom">
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
// import Services from '../services';

export default {
  
  //       async created()
  // {
  //     this.datasets[0].data = await Services.countReaction();      //upisivanje podataka iz backenda u niz za ispis
  //     this.datasets1[0].data = await Services.countReaction();      //upisivanje podataka iz backenda u niz za ispis
  // },

  data() {
    return {
      datasets:[
        {
         data:[],  // niz vrijednosti koje ispisuje na chartu
          backgroundColor: ["#f36e60", "#ffdb3b", "#185190","#3437eb","#eb34eb"], // pozadniske boje pie charta
          hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7","#d1d1fa","#fad1fa"] // isto boje charta
        }
      ],
      labels: ["Excelent", "Verry good", "Good","Pass","Fail"], //labelovi legende
      option: {},
      option1: {
        legend: {
            display: false
        },
        scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
      }
    };
  }
};
</script>
