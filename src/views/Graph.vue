<template>
    <div>
        <h1>GRAFIK</h1>
      <!--  <ChartBar />-->
      <ChartDoughnut />
    </div>
</template>


<script>
//import ChartBar from "@/components/chart-bar";
import ChartDoughnut from "@/components/chart-doughnut";

export default {
    components:{
       // ChartBar,
        ChartDoughnut
    }
    
};

</script>

<style scoped>
*{
    margin:10px;
}
</style>