<template>
<div id="login">
<form id="form">
  <div class="input-area">
    <span class="tag">Username:</span>
    <input class="input-el" v-model="message.username" placeholder="">
    <br>
  </div>
  <div class="input-area">
  <span class="tag">Password:</span>
  <input class="input-el" type="password" v-model="message.password" placeholder=""><br>
  <br>
  </div>
   <button class="button" v-bind:class="{ buttonActive: inactive, red: fail, green: succ }" type="button" @click="send(); inactive=!inactive;">
     <span v-bind:class="{ none: inactive}">{{loginText}}</span>
     <span class="gg-close" v-bind:class="{ none: !fail}"></span>
     <span class="gg-check" v-bind:class="{ none: !succ}"></span>
     </button>
    <span class="error" v-bind:class="{ none: err==0}">{{errMsg}}</span>
</form>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Services from '../services/api';

export default {
    data: function()
    {
        return {
          message: 
            {
            username: "Emir",
            password: "password"
            },
          inactive: false,
          loginText: 'Login',
          succ: false,
          fail: false,
          err:0,
          errMsg: "Došlo je do pogreške."
        }
    },
    computed: {
      ...mapGetters({
        getToken : 'get_token'
   }),
    },
    methods:
     {
      async send(){
        this.updateTokenAction(await Services.login(this.message.username,this.message.password))
        setTimeout(()=>{
          this.$router.push('/user');
        }, 2500);
     },
     ...mapActions([ // calling mutation that will update token in vuex.
    'updateTokenAction'
     ]),
     restartInactive() {
        if((!this.message.password || 0 === this.message.password.length) || (!this.message.username || 0 === this.message.username.length)) {this.fail = true; this.err=this.err+1;}
        else {this.succ = true; this.err=0}
        setTimeout(()=>{
        this.succ=false;
        this.fail=false;
        this.inactive=false;
        },2000);
     }
   },
   watch: {
     inactive: function() {
       if(this.inactive == true) {
        this.loginText='';
        setTimeout(this.restartInactive, 2500);
       }
       else this.loginText='Login';
     }
   }
}
</script>

<style scoped>
#login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.input-area
{
  --default-color: white;
  --border-bottom-color: white;
  margin: 12px 0;
}
#form {
  display: flex;
  height: 36%;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  color: white;
  background-color:rgba(30,41,59,0.5);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
    0 1px 1px rgba(32, 32, 32, 0.155),
    0 2.1px 2.1px rgba(32, 32, 32, 0.195),
    0 4.4px 4.4px rgba(32, 32, 32, 0.241),
    0 12px 12px rgba(32, 32, 32, 0.35);
}
.tag {
  font-size: small;
  display: flex;
  flex-direction: column;
  margin-left: -39%;
  background-color: transparent;
  outline: none;
  color: white;
}
.input-el{
  text-align: left;
  margin: auto 20px;
  width: 50%;
  padding: 4px;
  color: white;
  background-color: transparent;
  border-style: hidden;
  border-bottom: 2px solid rgba(255, 254, 254, 0.89);
}
textarea:focus, input:focus{
  outline: none;
  color:rgba(170, 233, 219, 0.842);
  border-bottom: 2px solid rgba(170, 233, 219, 0.5);
  transition: ease-in 100ms;
}
 .button
{
  transition: ease-in 250ms;
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
  0 12px 12px rgba(32, 32, 32, 0.35);
  outline:none;
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
@keyframes loading-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>