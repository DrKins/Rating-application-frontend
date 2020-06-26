<template>
  <div class="background">
    <img alt="logotip" src="../assets/logo.png" class="logotype" id="logo">
    <h1 class="message">Molimo Vas ocijenite naše usluge klikom na emotikon!</h1>
    <img v-on:click="trafficLight" alt="1 smajli" src="../assets/blackPack/1.png"  class="emoticon" id="1">
    <img v-if="get_emoticonNumber==5" v-on:click="trafficLight" alt="2 smajli" src="../assets/blackPack/2.png" class="emoticon" id="2">
    <img v-on:click="trafficLight" alt="3 smajli" src="../assets/blackPack/3.png" class="emoticon" id="3">
    <img v-if="get_emoticonNumber==4 || get_emoticonNumber==5" v-on:click="trafficLight" alt="4 smajli" src="../assets/blackPack/4.png" class="emoticon" id="4">
    <img v-on:click="trafficLight" alt="5 smajli" src="../assets/blackPack/5.png" class="emoticon" id="5"> 
    {{emoticon}}
    </div>
</template>


<script>
import Services from '../services';

import { mapGetters, mapMutations} from "vuex";

export default {
  name: 'reactions',
    data () {
    return {
      emoticon: 3,
      date: Date.now(),
    }
  },
  computed: {
  ...mapGetters(["get_emoticonNumber"]),
  ...mapMutations(['update']),
  },
async beforeCreate()
  {
    try{
      this.reakcije = await Services.getPosts();
    }
    catch(err) {
      this.error = err.message;
    }
  },
  mounted()
  {
    this.trafficLight();
  },
  methods: {
    async trafficLight()
    {
      this.emoticon = event.srcElement.id;
      await Services.insertReaction(this.emoticon);
      this.reakcije = await Services.getPosts();
      this.$router.push('/thanks');
    },

    async deletePost(id)
    {
      await Services.deletePost(id);
       this.posts = await Services.getPosts(); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  min-height: 100vh;
}
.logotype {
 width: 25%;
 padding: 4%;
}
.message {
  padding: 1%;
  font-size: 3.5vh;
}
.emoticon
{
width: 4%;
padding: 4%;
}
</style>

