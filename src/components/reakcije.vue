<template>
  <div class="pozadina">
  <!-- <h1 style="color:white">{{get_brojEmotikona}}</h1>  BROJ EMOTIKONA-->
  <img alt="logotip" src="../assets/logo.png" class="logotip" id="logo">
  <h1 class="poruka">Molimo Vas ocijenite naše usluge klikom na emotikon!</h1>
   <img  v-on:click="preusmjeri" alt="1 smajli" src="../assets/blackPack/1.png"  class="emotikon" id="1">
    <img  v-if="get_brojEmotikona==5" v-on:click="preusmjeri" alt="2 smajli" src="../assets/blackPack/2.png" class="emotikon" id="2">
    <img v-on:click="preusmjeri" alt="3 smajli" src="../assets/blackPack/3.png" class="emotikon" id="3">
    <img v-if="get_brojEmotikona==4 || get_brojEmotikona==5" v-on:click="preusmjeri" alt="4 smajli" src="../assets/blackPack/4.png" class="emotikon" id="4">
    <img v-on:click="preusmjeri" alt="5 smajli" src="../assets/blackPack/5.png" class="emotikon" id="5">
    </div>
</template>

<script>
import PostService from '../PostService';

import { mapGetters, mapMutations} from "vuex";

export default {
  name: 'reakcije',
    data () {
    return {
      emoticon: 11,
      date: Date.now(),
    }
  },
  computed: {
  ...mapGetters(["get_brojEmotikona"]),
  ...mapMutations(['update']),
  },
async beforeCreate()
  {
    try{
      this.reakcije = await PostService.getPosts();
    }
    catch(err) {
      this.error = err.message;
    }
    this.emotikoni();
  },
  mounted()
  {
  this.update();
  },
  methods: {
    async preusmjeri()
    {
     this.emoticon = event.srcElement.id;
      await PostService.insertPost(this.emoticon);
      this.reakcije = await PostService.getPosts();
      this.$router.push('/thanks');
    },
    async deletePost(id)
    {
      await PostService.deletePost(id);
       this.posts = await PostService.getPosts(); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pozadina {
  min-height: 100vh;
}
.logotip {
 width: 25%;
 padding: 4%;
}
.poruka {
  padding: 1%;
  font-size: 3.5vh;
}
.emotikon
{
width: 4%;
padding: 4%;
}
</style>

