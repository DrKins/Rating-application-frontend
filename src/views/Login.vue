<template>
<div id="login">
<form id="form">
  <div class="row1">
    <span class="tag">Username:</span>
    <input class="input-el" v-model="message.username" placeholder="Username">
    <br>
  </div>
  <div class="row2">
  <span class="tag">Password:</span>
  <input class="input-el" type="password" v-model="message.password" placeholder="Password"><br>
  <br>
  </div>
  <div class="row3">
    <button class="button" v-bind:class="{ buttonActive: inactive, red: fail, green: succ }" type="button" @click="send(); inactive=!inactive;">
     <span v-bind:class="{ none: inactive}">{{loginText}}</span>
     <span class="gg-close" v-bind:class="{ none: !fail}"></span>
     <span class="gg-check" v-bind:class="{ none: !succ}"></span>
    </button>
  </div>
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
            username: "",
            password: ""
            },
          inactive: false,
          loginText: 'Login',
          succ: false,
          fail: false,
          err:0,
        }
    },
    computed: {
      ...mapGetters({
        getToken : 'get_token',
        getLevel : 'get_level'
   }),
    },
    methods:
     {
       // Method that sends data to backend and redirect to proper page.
      async send(){
        this.updateTokenAction(await Services.login(this.message.username,this.message.password))
        this.err=-1;
        setTimeout(()=>{
          if(this.getLevel.level == 1 ) this.$router.push('/user')
          else this.$router.push('/admin')
        }, 2500);
     },
     ...mapActions([ // calling mutation that will update token in vuex.
    'updateTokenAction'
     ]),
     // Controll of spining animation of button.
     restartInactive() {
        if(this.err === -1) {this.succ = true;}
        else {this.fail = true; this.err=this.err+1;}
        setTimeout(()=>{
        this.succ=false;
        this.fail=false;
        this.inactive=false;
        },2000);
     },
   },
   watch: {
     // Watching inactive variable - button spining.
     inactive: function() {
       if(this.inactive == true) {
        this.loginText='';
        setTimeout(this.restartInactive, 2895);
       }
       else this.loginText='Login';
     }
   },
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
  padding-bottom: 4vh;
  margin-bottom:2vh;
  margin-top:1vh;
}

#form {
  display: flex;
  height: 25vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5vw;
  color: white;
  background-color:rgba(30,41,59,0.5);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
    0 1px 1px rgba(32, 32, 32, 0.155),
    0 2.1px 2.1px rgba(32, 32, 32, 0.195),
    0 4.4px 4.4px rgba(167, 165, 165, 0.241),
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
.error{
  transition: ease-in 500ms;
  margin-top: 1vh;
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
@media only screen and (max-device-width: 1024px) {
  #form {
    height: 30vh;
  }
  .input-area
  {
    --default-color: white;
    --border-bottom-color: white;
    padding-bottom: 4vh;
    margin-bottom:2vh;
    margin-top:-1vh;
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
    outline:none;
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
}
@media screen and (min-width: 768px) and (orientation: portrait){
  #form {
    height: 17vh;
  }
  .input-area
  {
    --default-color: white;
    --border-bottom-color: white;
  }
}
@media screen and (min-height: 280px) and (max-height: 450px) and (orientation: landscape){
  #form {
    height: 65vh;
  }
  .input-area
  {
    --default-color: white;
    --border-bottom-color: white;
  }
}
</style>