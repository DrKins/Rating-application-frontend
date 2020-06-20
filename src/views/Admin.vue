<template>
<div class="admin">
<form id="forma">
  <div class="razmak">
    <span style="color:white">Poruka</span>
    <input style="color:white" v-model="message.text" placeholder="Unesite poruku">
    <!--<p style="color:white">{{ message.text }}</p>>--><br>
  </div>
  <div class="razmak">
  <span style="color:white">Trajanje poruke</span>
  <select style="color:white" v-model="message.duzina">
    <option  disabled value=""></option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
      </select><br>
  <!--<p style="color:white">{{ message.duzina }}</p>--><br>
  </div>
  <div class="razmak">
  <span style="color:white">Broj emotikona</span>
    <select style="color:white" v-model="selected">
    <option  disabled value=""></option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
      </select><br>
  </div>
  <span>
    <form id="button">
      <button v-on:click="send" style="color:white">Send</button>
    </form>
  </span>
</form>
<!-- <form id="button">
      <button v-on:click="send" style="color:white">Send</button>
</form> -->
</div>
</template>

<script>

import PostService from '../PostService';
export default {
    data: function()
    {
        return {
             message: 
            {
            text: "",
            duzina: 3
            },
            selected: 3,
            settings : []
        }
    },
    async created()
  {
    try{
      this.settings = await PostService.getSettings();
    }
    catch(err) {
      this.error = err.message;
    }
  },
    methods:
    {
       async send()
    {
      await PostService.updatePost(this.message.text,this.message.duzina,this.selected);
       this.settings = await PostService.getSettings();
    }
    }
}
</script>

<style scoped>
.admin{
  min-height: 100vh;
  padding: 30vh;
  position: relative;
}
#forma
{
  margin: auto;
  width: 50vw;
  height: 40vh;
  border: 1px solid black;
  background-color:#1e293b;
  padding: 2vw;
}
.razmak {
  padding-top: 4vh;

}
 #button
{
  margin-top: 10vh;
} 
#admin
{
    border:1px solid black;
}
</style>