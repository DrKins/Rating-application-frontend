<template>
  <div class="background" v-bind:class="{none: !load}">
    <div class="message tracking-in-expand ">
      <p>Ocijenite našu uslugu!</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: 'message',
    data () {
    return {
      load: false
    }
  },
   computed: {
    ...mapGetters({
          loaded: 'get_loaded'
    })
  },
  methods: {
    // Method that smoothly loads text.
    loadingText(){
      setTimeout(()=>{
        this.load = true;
      },1500)
    }
  },
  created(){
    this.loadingText();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  overflow: hidden;
  color:#FBEEC1
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30vh;
}
.message {
  padding: 1vw;
  margin-bottom: 9vh;
}
.none {
  display: none;
}
body{
  padding: 40px;
  background-color: #121212; 
}

p {
  padding: 2vh;
  white-space: nowrap;
  overflow: hidden;    
  font-family: 'Source Code Pro', monospace;  
  font-size: 3.5vh;
  color: rgba(255,255,255,.70);
  margin: 0 auto;
  text-shadow: 0 1px 0 #ccc,
              0 2px 0 #c9c9c9,
              0 3px 0 #bbb,
              0 4px 0 #b9b9b9,
              0 3px 0 #aaa,
              0 4px 1px rgba(0,0,0,.1),
              0 0 2px rgba(0,0,0,.1),
              0 1px 3px rgba(0,0,0,.3),
              0 3px 2px rgba(0,0,0,.2),
              0 3px 1px rgba(0,0,0,.25),
              0 9px 1px rgba(0,0,0,.2),
              0 1px 1px rgba(0,0,0,.15);
}

/* p {
  -webkit-animation: animated-text 20s steps(42) infinite both,
                     animated-cursor 500ms steps(42) infinite both;
  animation: animated-text 20s steps(42) infinite both,
             animated-cursor 500ms steps(42) infinite both;
} */
.tracking-in-expand {
	-webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
.fade-in {
	-webkit-animation: fade-in 3.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in 3.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media screen and (min-height:360px) and (max-width:450px) and (orientation:portrait){
    p {
    font-size: 1.35rem;
    }
}
 @media screen and (max-height:450px) and (orientation:landscape){
    p {
      font-size: 2rem;
    }
}
</style>

