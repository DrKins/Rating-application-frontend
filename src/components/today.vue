<template>
  <div class="background">
    <chart/>
  </div>
</template>


<script>
import chart from './../components/chart-doughnut';
export default {
  name: 'today',
  components: {
    chart,
  },
    data () {
    return {
    }
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:0;
  padding:0;
  overflow: hidden;
  color:#FBEEC1
}
.background{
  height: 70vh;
}
</style>

