<template>
  <div class="thanks">
    <img alt="logotip" src="../assets/logo.png" class="logotip" id="logo">
    <h1 class="poruka">Hvala na povjerenju!</h1>
  </div>
</template>
<script>
export default {

mounted: function()
{
   setTimeout(() => {
      this.$router.push('/');
     }, 5000);
}
}
</script>
<style scoped>
.thanks {
  min-height: 100vh;
}
.logotip {
 width: 25%;
 padding: 4%;
}
.poruka {
  padding: 1%;
  font-size: 4.5vh;
}
</style>