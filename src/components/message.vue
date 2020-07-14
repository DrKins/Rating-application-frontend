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
  border-right: solid 3px rgba(0, 132, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;    
  font-family: 'Source Code Pro', monospace;  
  font-size: 5.5vh;
  color: rgba(255,255,255,.70);
  margin: 0 auto;
}

p {
  animation: animated-text 15s steps(60) infinite both,
             animated-cursor 500ms steps(60) infinite both;
}

@keyframes animated-text{
  0%{width: 0;}
  50%{width: 900px;}
  75%{width: 900px;}
  100%{width: 0;}
}

@keyframes animated-cursor{
  from{border-right-color: rgba(0, 132, 255, 0.75);}
  to{border-right-color: transparent;}
}

</style>

