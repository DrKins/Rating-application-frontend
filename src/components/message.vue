<template>
  <div class="background">
    <div class="message">
      <p>Ocijenite našu uslugu klikom na emotikon!</p>
    </div>
  </div>
</template>


<script>

export default {
  name: 'message',
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
.message {
  padding: 1vw;
  margin-bottom: 9vh;
  font-size: 4.5vh;
}
</style>

