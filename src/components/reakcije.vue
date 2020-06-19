<template>
  <div class="pozadina">
  <img alt="logotip" src="../assets/logo.png" class="logotip" id="logo">
  <h1 class="poruka">Molimo Vas ocijenite naše usluge klikom na emotikon!</h1>
   <img v-on:click="preusmjeri" alt="1 smajli" src="../assets/blackPack/1.png"  class="emotikon" id="1">
    <img v-on:click="preusmjeri" alt="2 smajli" src="../assets/blackPack/2.png" class="emotikon" id="2">
    <img v-on:click="preusmjeri" alt="3 smajli" src="../assets/blackPack/3.png" class="emotikon" id="3">
    <img v-on:click="preusmjeri" alt="4 smajli" src="../assets/blackPack/4.png" class="emotikon" id="4">
    <img v-on:click="preusmjeri" alt="5 smajli" src="../assets/blackPack/5.png" class="emotikon" id="5">
  <div class="reakcije"
  v-for="(reakcija,index) in reakcije"
  v-bind:item="reakcija" 
  v-bind:index="index"
  v-bind:key = "reakcija._id">
</div>
    </div>
</template>

<script>
import PostService from '../PostService';

import { mapGetters } from "vuex";

export default {
  name: 'reakcije',
    data () {
    return {
      emoticon: 11,
      date: Date.now(),
      reakcije : []
    }
  },
  computed: {
  ...mapGetters(["get_maxBrojeva"]),
  },
async created()
  {
    try{
      this.reakcije = await PostService.getPosts();
    }
    catch(err) {
      this.error = err.message;
    }
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
 
   /* async preusmjeri()
    {
     this.emoticon = event.srcElement.id;
    console.log(this.emoticon)
    await reakcijeBaza.insertReakcije(new Date(),event.srcElement.id);
    //this.$router.push('/about');
    }
  }*/

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

