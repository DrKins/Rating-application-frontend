<template>
<div class="container">
  <div class="background">
    <div class="column0">
      <form id="form">
        <div class="input-el input-msg">
          <span>Thank You Message:</span>
          <input class="input" v-model="message.text" placeholder="Enter message">
        </div>
        <div class="input-el">
          <span>Duration of message in seconds:</span>
          <select class="select-css" v-model="message.len">
            <option disabled value=""></option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select><br>
        </div>
        <div class="input-el">
          <span>Number of emoticons that are showed: </span>
          <select class="select-css" v-model="message.emojis">
            <option disabled value=""></option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select><br>
        </div>
        <div class="input-el">
          <span>Emoticon pack: </span>
          <select class="select-css" v-model="message.pack">
            <option disabled value=""></option>
            <option>yellowPack</option>
            <option>blackPack</option>
          </select><br>
        </div>
      </form>
    </div>
    <div class="column1">
        <form id="form">
          <div class="input-el">
            <span>Slack Token:</span>
            <input class="input" v-model="slack.SlackToken" type="password" placeholder="Enter token">
          </div>
              <div class="input-el">
            <span >Slack Bot:</span>
            <input class="input" v-model="slack.SlackBot" placeholder="Enter Bot">
          </div>
            <div class="input-el">
            <span >Slack Channel:</span>
            <input class="input" v-model="slack.SlackChannel" placeholder='Enter channel'>
          </div>
        </form>
    </div>
  </div>
    <div class="column2">
      <button class="button" v-bind:class="{ buttonActive: inactive, red: fail, green: succ }" type="button" @click="send(); inactive=!inactive;">
        <span v-bind:class="{ none: inactive}">{{loginText}}</span>
        <span class="gg-close" v-bind:class="{ none: !fail}"></span>
        <span class="gg-check" v-bind:class="{ none: !succ}"></span>
      </button>
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
            pack: "default"
          },
    slack:{
            SlackToken : '',
            SlackBot : '',
            SlackChannel : '' 
    },
    inactive: false,
    loginText: 'Update',
    succ: false,
    fail: false,
    err:0,
    }
  },
   computed: {
    ...mapGetters({
          Token: 'get_token'
    })
  },
  methods: {
    // Method that sends new settings of company to backend.
    send(){
      if(this.send.text === '' || this.send.pack === 'default'){ 
        Services.Setslack(this.Token,this.slack.SlackToken,this.slack.SlackBot,this.slack.SlackChannel);
      } else if (this.slack.Token === '' || this.slack.SlackBot === '') Services.updateSettings(this.Token,this.message.text,this.message.len,this.message.emojis,this.message.pack);
      else{
        Services.Setslack(this.Token,this.slack.SlackToken,this.slack.SlackBot,this.slack.SlackChannel);
        Services.updateSettings(this.Token,this.message.text,this.message.len,this.message.emojis,this.message.pack);
      }
      this.err=-1;
     },
    // Method that will restart animation after fail or success.
    restartInactive() {
      if(this.err === -1) {this.succ = true;}
      else {this.fail = true; this.err=this.err+1;}
      setTimeout(()=>{
      this.succ=false;
      this.fail=false;
      this.inactive=false;
      },2000);
     }
  },
  watch: {
     // Watching inactive variable - button spining.
     inactive: function() {
       if(this.inactive == true) {
        this.loginText='';
        setTimeout(this.restartInactive, 2500);
       }
       else this.loginText='Update';
     }
   }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  overflow: hidden;
}
.container{
  display:flex;
  flex-direction:column;
  justify-content: space-evenly;
  height: 70vh;
}
.background {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.column0{
  padding:1vw;
  border-radius:10px;
}
.column1{
  padding:1vw;
  border-radius:10px;
  background-color: rgba(20, 66, 43, 0.377);
  align-self: center;
}
.input-el {
  display: flex;
  margin: 15% auto;
}
.input-msg {
  padding: 1rem 0rem 1.5rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(41, 44, 44, 0.842);
  background-color: rgba(32, 32, 32, 0.109);
  }
.input {
  color: white;
  background-color: transparent;
  border-style: hidden;
  border-bottom: 1px solid white;
  margin-left: 1vw;
}
input:focus{
  outline: none;
  color:rgba(170, 233, 219, 0.842);
  border-bottom: 1px solid grey;
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

/* Button css */
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
  margin: 1vh 5vh;
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
@keyframes loading-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-height: 450px) and (orientation: landscape){
  .background{
    font-size: 0.7rem;
  }
  .input-el{
    margin: 2% auto;
  }
  .input-msg {
  padding: 1vw;
  border-radius: 10px;
  border: 1px solid rgba(41, 44, 44, 0.842);
  background-color: rgba(32, 32, 32, 0.109);
  }
  .select-css {
	display: block;
	font-size: 12px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.1;
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
}

@media screen and (max-width: 450px) and (orientation: portrait){
  .background{
    flex-direction: column;
    justify-content: space-around;
    font-size: 0.7rem;
  }
  .column0{
      align-self: stretch;
  }
  .column1{
      align-self: stretch;
  }
  .input-el{
    margin: 2% auto;
  }
  .input-msg {
  padding: 1vw;
  border-radius: 10px;
  border: 1px solid rgba(41, 44, 44, 0.842);
  background-color: rgba(32, 32, 32, 0.109);
  }
  .select-css {
	display: block;
	font-size: 12px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.1;
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
}
@media (hover: hover) {
  .button:hover {
    background-color: rgba(28, 110, 164, 0.7);
  }
}
</style>

