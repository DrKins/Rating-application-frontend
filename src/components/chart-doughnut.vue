<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">Doughnut</h2>
    </div>

    <div class="card-img-bottom">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
var niz =  [];
export default {
  
        async created()
  {
    try{

     
     let settings = await PostService.getSettings();
      
    for(let i = 0;i<settings.brojEmotikona;i++){
      niz.push(await PostService.countReaction(this.id));
     }
      
    }
    catch(err) {
      this.error = err.message;
    }
  }, 
    
  
  data() {
    return {
      datasets: [
        {
          data:niz,  // niz vrijednosti koje ispisujes na chartu
          backgroundColor: ["#f36e60", "#ffdb3b", "#185190","#3437eb","#eb34eb"], // pozadniske boje pie charta
          hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7","#3437eb","#eb34eb"] // isto boje charta
        }
      ],
      labels: ["Excelent", "Verry good", "Good","Pass","Fail"], //labelovi legende
      option: {}
    };
  }
};
</script>
