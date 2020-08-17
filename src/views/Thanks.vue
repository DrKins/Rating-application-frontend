<template>
  <div class="thanks">
    <div class="row0"><logotype/></div>
    <div class="row1">
      <h1 class="message">{{get_adminMessage}}</h1>
    </div>
  </div>
</template>
<script>
import { mapGetters} from "vuex";
import logotype from '../components/logotype'

export default {
components: {
    logotype
},
beforeMount: function()
{
},
mounted: function()
{
  // Timout that will redirect to reactions page after admin Message duration is over.
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: auto 10%;
  color:white;
}
.row0{
  background-color:rgba(25, 127, 223, 0.527);
  border: solid 1px rgba(3, 61, 116, 0.021);
  margin-bottom: 1vw;
}
.row1{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  background-color:rgba(3, 61, 116, 0.25);
  border: solid 1px rgba(3, 61, 116, 0.021);
}
.message {
  padding: 1%;
  font-size: 4.5vh;
}
@media screen and (orientation: portrait){
  .message{
    font-size:1.1rem
  }
}
</style>