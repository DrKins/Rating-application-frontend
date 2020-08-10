<template>
<div class="background">
  <div v-if="Level!=1" id="list">
  <table id="allUsers">
    <th>Name</th>
    <th>Level</th>
    <th>Company</th>
    <tr class="test" v-for="item in Users" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.lvl}}</td>
      <td>{{ item.company}}</td>
    </tr>
  </table>
  </div> 
  <div id="createUser" class="space"> 
    <form id="form">
      <div v-if="Level==3" class="input-el">
        <span>Company:</span>
        <input class="input" v-model="user.company" placeholder="Naziv firme">
      </div>
        <span v-if="Level==3">Level:</span>
            <select v-if="Level==3" class="input" v-model="user.lvl">
            <option disabled value=""></option>
            <option>1</option>
            <option>2</option>
          </select>
            <div class="input-el">
        <span >Username:</span>
        <input class="input" v-model="user.name" placeholder="Naziv korisnika">
      </div>
        <div class="input-el">
        <span >Password:</span>
        <input class="input" v-model="user.password"  type="password" placeholder='Password korisnika'>
      </div>
      <button class="button" v-bind:class="{ buttonActive: inactive, red: fail, green: succ }" type="button" @click="send(); inactive=!inactive;">
        <span v-bind:class="{ none: inactive}">{{loginText}}</span>
        <span class="gg-close" v-bind:class="{ none: !fail}"></span>
        <span class="gg-check" v-bind:class="{ none: !succ}"></span>
      </button>
    <span class="error" v-bind:class="{ none: err=== -1 || err=== 0}">{{errMsg}}</span>
    </form>
  </div>
</div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import Services from '../services/api'
export default {
  name: 'users',
    data () {
    return {
          user:{
              company: '',
              name: '',
              password: '',
              lvl:2
          },
          inactive: false,
          loginText: 'Register',
          succ: false,
          fail: false,
          err:0,
          errMsg: "Došlo je do pogreške."  
    }
  },
   computed: {
    ...mapGetters({
          Token: 'get_token',
          Level: 'get_level',
          Users: 'get_users'
    })
  },
  methods: {
    // Method that checks admin level and sends right data to backend.
    send(){
      if(this.Level === 3) {
        Services.register(this.Token,this.user.name,this.user.password,this.data.lvl,this.user.company);
        this.err = -1;
        console.log("Company registration completed.");
      } else {
        Services.register(this.Token,this.user.name,this.user.password,this.data.lvl);
        this.err = -1;
        console.log("User registration completed.");
       }
      },
      // Fetches all clients of aplication only for Admin level 3.
    async getData() {
      this.getUsers(await Services.getallUsers(this.Token));
      console.log("Data is fetched.")
    },
    restartInactive() {
      if(this.err === -1) {this.succ = true;}
      else {this.fail = true; this.err=this.err+1;}
      setTimeout(()=>{
      this.succ=false;
      this.fail=false;
      this.inactive=false;
      },2000);
     },
      ...mapActions([ // calling mutation that will update users in vuex.
    'getUsers'
     ]),
  },
  watch: {
     // Watching inactive variable - button spining.
    inactive: function() {
      if(this.inactive == true) {
        this.loginText='';
        setTimeout(this.restartInactive, 2500);
      }
      else this.loginText='Register';
     }
  },
  created(){
    this.getData();
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
.space {
  margin: auto 10vw;
}
.input-el {
  margin: 25% auto;
}
.input {
  color: white;
  background-color: transparent;
  border-style: hidden;
  border-bottom: 1px solid white;
  margin-left: 2vw;
}
input:focus{
  outline: none;
  color:rgba(170, 233, 219, 0.842);
  border-bottom: 1px solid rgba(140, 206, 229, 0.842);
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
.buttonActive{
  transition: ease-in 500ms;
  padding: 10px;
  width: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  box-shadow: 1px 1px 10px rgba(32, 32, 32, 0.109),
  1px 1px 10px rgba(32, 32, 32, 0.155),
  1px 1px 10px rgba(32, 32, 32, 0.195),
  1px 1px 10px rgba(32, 32, 32, 0.241),
  1px 1px 10px rgba(32, 32, 32, 0.35);
  cursor: default;
  animation: loading-rotation 3s ease 500ms normal;
  outline:none;
}
.gg-close {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 40px;
    margin:auto auto;
}
.gg-close::after,
.gg-close::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 1px
}
.gg-close::after {
    transform: rotate(-45deg)
}
.gg-check {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    margin: auto auto;
    transition: ease-in 250ms;
}
.gg-check::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px;
    top: -1px;
    width: 6px;
    height: 10px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    transform-origin: bottom left;
    transform: rotate(45deg)
}
.red {
  background-color: #df775d;
}
.error{
  transition: ease-in 500ms;
  margin-top: 15%;
  color:#df775d;
  font-size: small;
}
.green {
  background-color: #5ddf8f;
}
.none {
  display:none;
}
#allUsers{
  text-decoration: none; 
}
td{
  text-decoration: none; 
  border: 1px solid rgba(140, 206, 229, 0.842); 
  padding: 0.1vw;
}
th{
  padding: 0.5vw;
}
@keyframes loading-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

