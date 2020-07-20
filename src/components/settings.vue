<template>
<div class="background">
  <div id="updateSettings">
    <form id="form">
  <div class="input-el">
    <span>Poruka</span>
    <input class="input" v-model="message.text" placeholder="Unesite poruku">
  </div>
  <div class="input-el">
  <span>Trajanje poruke</span>
    <select class="input" v-model="message.len">
      <option disabled value=""></option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select><br>
  </div>
  <div class="input-el">
  <span>Broj emotikona</span>
    <select class="input" v-model="message.emojis">
      <option disabled value=""></option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select><br>
  </div>
    <button type="button" class="button" @click="send()">Send</button>
</form>
  </div>
</div>
</template>


<script>
import { mapGetters } from "vuex";
import Services from '../services/api'
export default {
  name: 'settings',
    data () {
    return {
     message: 
          {
            text: "",
            len: 3,
            emojis: 3,
          },
    }
  },
   computed: {
    ...mapGetters({
          Token: 'get_token'
    })
  },
  methods: {
    send(){
      Services.updateSettings(this.Token,this.message.text,this.message.len,this.message.emojis);
                  console.log("Uspjesno update settings!");
     },
  },
  created(){
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  overflow: hidden;
}
.background {
  display: flex;
  justify-content: stretch;
  align-items: center;
}
.input-el {
  margin: 25% auto;
}
.input {
  color: grey;
  background-color: transparent;
  border-style: hidden;
}
input:focus{
  outline: none;
  color:grey;
  border-bottom: 1px solid grey;
  transition: ease-in 100ms;
}
.button
{
  padding: 10px;
  width: 100px;
  height: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
  0 1px 1px rgba(32, 32, 32, 0.155),
  0 2.1px 2.1px rgba(32, 32, 32, 0.195),
  0 4.4px 4.4px rgba(32, 32, 32, 0.241),
  0 5px 5px rgba(32, 32, 32, 0.35);
  outline:none;
  margin: 1vh 5vh;
} 
.button:hover {
  background-color: rgba(28, 110, 164, 0.7);
}
</style>

