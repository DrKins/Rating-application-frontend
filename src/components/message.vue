<template>
  <div class="background" v-bind:class="{none: !load}">
    <div class="message">
      <p>Ocijenite našu uslugu klikom na emotikon!</p>
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
  border-right: solid 3px rgba(0, 132, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;    
  font-family: 'Source Code Pro', monospace;  
  font-size: 5.5vh;
  color: rgba(255,255,255,.70);
  margin: 0 auto;
  text-shadow: 0 1px 0 #ccc,
              0 2px 0 #c9c9c9,
              0 3px 0 #bbb,
              0 4px 0 #b9b9b9,
              0 5px 0 #aaa,
              0 6px 1px rgba(0,0,0,.1),
              0 0 5px rgba(0,0,0,.1),
              0 1px 3px rgba(0,0,0,.3),
              0 3px 7px rgba(0,0,0,.2),
              0 3px 1px rgba(0,0,0,.25),
              0 9px 1px rgba(0,0,0,.2),
              0 1px 1px rgba(0,0,0,.15);
}

p {
  -webkit-animation: animated-text 20s steps(42) infinite both,
                     animated-cursor 500ms steps(42) infinite both;
  animation: animated-text 20s steps(42) infinite both,
             animated-cursor 500ms steps(42) infinite both;
}

@-webkit-keyframes animated-text{
    0%{width: 0;}
    50%{width: 875px;}
    75%{width: 875px;}
    100%{width: 0;}
}
@keyframes animated-text{
  0%{width: 0;}
  50%{width: 875px;}
  75%{width: 875px;}
  100%{width: 0;}
}

@-webkit-keyframes animated-cursor{
  from{border-right-color: rgba(0, 132, 255, 0.75);}
  to{border-right-color: rgba(0,0,0,.3);}
}
@keyframes animated-cursor{
  from{border-right-color: rgba(0, 132, 255, 0.75);}
  to{border-right-color: rgba(0,0,0,.3);}
}
@media screen and (min-height:360px) and (max-width:450px) and (orientation:portrait){
    p {
    font-size: 1.5rem;
    animation: animated-text 15s steps(21) infinite both,
              animated-cursor 500ms steps(21) infinite both;
    }
    @keyframes animated-text{
    0%{width: 0;}
    50%{width: 265px;}
    75%{width: 265px;}
    100%{width: 0;}
    }
}
@media screen and (max-height:450px) and (orientation:landscape){
    p {
    font-size: 1.5rem;
    -webkit-animation: animated-text 15s steps(42) infinite both
                       animated-cursor 500ms steps(42) infinite both;
    animation: animated-text 15s steps(42) infinite both
               animated-cursor 500ms steps(42) infinite both;
    }
  @-webkit-keyframes animated-text{
    0%{width: 0;}
    50%{width: 530px;}
    75%{width: 530px;}
    100%{width: 0;}
    }
    @keyframes animated-text{
    0%{width: 0;}
    50%{width: 530px;}
    75%{width: 530px;}
    100%{width: 0;}
    }
}
@media screen and (min-height:1024px) and (orientation:portrait){
    p {
    font-size: 3rem;
    -webkit-animation: animated-text 15s steps(22) infinite both,
              animated-cursor 500ms steps(22) infinite both;
    animation: animated-text 15s steps(22) infinite both,
              animated-cursor 500ms steps(22) infinite both;
    }
    @-webkit-keyframes animated-text{
    0%{width: 0;}
    50%{width: 532px;}
    75%{width: 532px;}
    100%{width: 0;}
    }    
    @keyframes animated-text{
    0%{width: 0;}
    50%{width: 532px;}
    75%{width: 532px;}
    100%{width: 0;}
    }
}
@media screen and (min-width: 1024px) and (orientation:landscape){
    p {
    font-size: 2rem;
    -webkit-animation: animated-text 15s steps(42) infinite both,
              animated-cursor 500ms steps(42) infinite both;
    animation: animated-text 15s steps(42) infinite both,
              animated-cursor 500ms steps(42) infinite both;
    }
    @-webkit-keyframes animated-text{
    0%{width: 0;}
    50%{width: 705px;}
    75%{width: 705px;}
    100%{width: 0;}
    }
    @keyframes animated-text{
    0%{width: 0;}
    50%{width: 705px;}
    75%{width: 705px;}
    100%{width: 0;}
    }
}
</style>

