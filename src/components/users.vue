<template>
<div class="background">
  <div id="level1" class="space">
    Lista svih korisnika aplikacije.
        {{user.adminPassword}}
        {{user.userPassword}}
    </div>
  <div id="level2" class="space">
    Lista svih admina aplikacije.
    </div>
  <div id="createUser" class="space">
    <form id="form">
      <div class="input-el">
        <span>Naziv kompanije</span>
        <input class="input" v-model="user.company" placeholder="Naziv firme">
      </div>
            <div class="input-el">
        <span>Naziv administratora</span>
        <input class="input" v-model="user.admin" placeholder="Naziv admina">
      </div>
            <div class="input-el">
        <span>Naziv korisnika</span>
        <input class="input" v-model="user.user" placeholder="Naziv korisnika">
      </div>
        <button type="button" class="button" @click="password()">Create</button>
    </form>
  </div>
</div>
</template>


<script>
import { mapGetters } from "vuex";
// import Services from '../services/api'
var generator = require('generate-password');
export default {
  name: 'users',
    data () {
    return {
            user:{
              company: '',
              admin: '',
              adminPassword: 'no',
              user: '',
              userPassword: 'no'
          },
    }
  },
   computed: {
    ...mapGetters({
          Token: 'get_token'
    })
  },
  methods: {
    // send(){
    //   Services.updateSettings(this.Token,this.message.text,this.message.len,this.message.emojis);
    //               console.log("Uspjesno update settings!");
    //  },
    password() {
      let array = {};
      for(let i=0;i<2;i++){
          var temp = generator.generate({
          length: 10,
          numbers: true
      });
      array[`password${i}`] = temp;
      }
      console.log(array);
      this.user.adminPassword = array.password0;
      this.user.userPassword = array.password1;
    }
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
  justify-content: space-between;
  align-items: center;
}
#createUser {
  background-color:rgba(35, 81, 112, 0.7);
}
.space {
  margin: auto 10vw;
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

