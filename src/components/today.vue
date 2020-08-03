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
  overflow: hidden;
  color:#FBEEC1
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

