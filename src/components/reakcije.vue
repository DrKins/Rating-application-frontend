<template>
  <div class="slike">
  <img alt="hotel" src="../assets/hotel.webp" id="hotel">
  <h1>Napuštate naš hotel nadamo se da ste imali lijepo iskustvo ostavite vašu reakciju</h1>
   <img v-on:click="preusmjeri" alt="1 smajli" src="../assets/1.png"  class="emotikon" id="1">
    <img v-on:click="preusmjeri" alt="2 smajli" src="../assets/2.png" class="emotikon" id="2">
    <img v-on:click="preusmjeri" alt="3 smajli" src="../assets/3.png" class="emotikon" id="3">
    <img v-on:click="preusmjeri" alt="4 smajli" src="../assets/4.png" class="emotikon" id="4">
    <img v-on:click="preusmjeri" alt="5 smajli" src="../assets/5.png" class="emotikon" id="5">
  <div class="reakcije"
  v-for="(reakcija,index) in reakcije"
  v-bind:item="reakcija" 
  v-bind:index="index"
  v-bind:key = "reakcija._id">
    <p class="text" style="color:white">{{reakcija.date}} - -{{reakcija.emoticon}}</p>
</div>
    </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'reakcije',
    data () {
    return {
      emoticon: 11,
      date: Date.now(),
      reakcije : []
    }
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
.emotikon
{
  width: 6%;
  height: 6%;
  padding:15px;
}
</style>

