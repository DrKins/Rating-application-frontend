<template>
<div id="container1">
  <div v-if="Level!=1" id="column1" class="scale-in-center" v-bind:class="{none:!loading}">
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
  <div id="column2" class="scale-in-center" v-bind:class="{none:!loading}"> 
    <form id="form">
      <div v-if="Level==3" class="input-el">
        <span>Company:</span>
        <input class="input" v-model="user.company" placeholder="Company name">
      </div>
        <span v-if="Level==3">Level:</span>
            <select v-if="Level==3" class="select-css" v-model="user.lvl">
            <option disabled value=""></option>
            <option>1</option>
            <option>2</option>
          </select>
            <div class="input-el">
        <span >Username:</span>
        <input class="input" v-model="user.name" placeholder="Enter username">
      </div>
        <div class="input-el">
        <span >Password:</span>
        <input class="input" v-model="user.password"  type="password" placeholder='Enter password'>
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
          loading: false,
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
      } else {
        Services.register(this.Token,this.user.name,this.user.password,this.data.lvl);
        this.err = -1;
       }
      },
      // Fetches all clients of aplication only for Admin level 3.
    async getData() {
      this.getUsers(await Services.getallUsers(this.Token));
      this.loading=true;
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
#container1 {
  height: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  height: 70vh;
}
#column1{
  align-self: center;
}
#column2{
  background-color: rgba(22, 65, 82, 0.3);
  border-radius: 10px;
  padding: 2em;
  margin-top: 2vh;
  align-self: center;
}
.input-el {
  display: flex;
  margin:1vh auto;
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

/* Select css */
.select-css {
	display: block;
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: .1em .1em .1em .1em;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
  margin-left: 1vw;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
	display: none;
}
.select-css:hover {
	border-color: #888;
}
.select-css:focus {
	border-color: #aaa;
	color: #222;
	outline: none;
}
.select-css option {
	font-weight:normal;
}

/* button css */
.button
{
  padding: 10px;
  width: 100px;
  height: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  outline:none;
  margin-top: 2vh;
} 
.buttonActive{
  transition: ease-in 500ms;
  padding: 10px;
  width: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  cursor: default;
  animation: loading-rotation 3s ease 500ms normal;
  outline:none;
  pointer-events: none;
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
.scale-in-center {
	-webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}

@keyframes loading-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 600px){
  #container1{
    display: flex;
    flex-direction: column;
  }
}
@media (hover: hover) {
  .button:hover {
    background-color: rgba(28, 110, 164, 0.7);
  }
}
</style>

