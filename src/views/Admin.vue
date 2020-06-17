<template>
<div id="admin">
<form id="forma">
 <span style="color:white">Poruka</span>
<input style="color:white" v-model="message.text" placeholder="edit me">
<!--<p style="color:white">{{ message.text }}</p>>--><br>
 <span style="color:white">Trajanje poruke</span>
 <input style="color:white" v-model="message.duzina" placeholder="edit me">
<!--<p style="color:white">{{ message.duzina }}</p>--><br>
    <select style="color:white" v-model="selected">
  <option  disabled value=""></option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
    </select><br>
 <span style="color:white">BROJ EMOTIKONA {{ selected }}</span>
</form>
<form id="button">
      <button v-on:click="send" style="color:white">Send</button>
</form>
{{settings}}
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
            text: "Hvala vam na glasanju",
            duzina: 5
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
      await PostService.updatePost();
       this.settings = await PostService.getSettings(); 
    }
    }
}
</script>

<style scoped>
*
{
    margin: 30px;
    padding: 30px;
}
#forma
{
    border: 1px solid white;
}
#button
{
    border: 1px solid white;
}
#admin
{
    border:1px solid black;
}
</style>