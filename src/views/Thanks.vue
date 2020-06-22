<template>
  <div class="thanks">
    <img alt="logotip" src="../assets/logo.png" class="logotip" id="logo">
    <h1 class="poruka">{{get_poruka}}</h1>
  </div>
</template>
<script>
import { mapGetters, mapMutations} from "vuex";

export default {
beforeMount: function()
{
    this.update();
},
mounted: function()
{
   setTimeout(() => {
      this.$router.push('/');
     }, this.get_trajanjePoruke*1000);
},
computed: {
  ...mapGetters(["get_poruka","get_trajanjePoruke"]),
  ...mapMutations(['update']),
  },
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