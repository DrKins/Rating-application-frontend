<template>
  <div class="thanks">
    <h1 class="message">{{get_adminMessage}}</h1>
  </div>
</template>
<script>
import { mapGetters} from "vuex";

export default {
beforeMount: function()
{
},
mounted: function()
{
   setTimeout(() => {
      this.$router.push('/user');
     }, this.get_adminMessageduration*1000);
},
computed: {
  ...mapGetters(["get_adminMessage","get_adminMessageduration"]),
  },
}
</script>
<style scoped>
.thanks {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: auto 10%;
}
.message {
  padding: 1%;
  font-size: 4.5vh;
}
</style>