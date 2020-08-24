<template>
  <div class="background">
    <ul id="horizontal-list" v-bind:class="{none: !loaded}">
      <li v-for="item in items" :key="item.id">
        <img v-bind:src="item.img" v-bind:alt="item.title" :id="item.id" @click="insertReaction">
      </li>
    </ul>
  </div>
</template>


<script>
import Services from '../services/api';
import { mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'emoticons',
    data () {
    return {
      items: [],
      emoji: null,
      loaded: false,
    }
  },
  computed: {
  ...mapMutations({
    update: 'mutateGUISettings'}),
  ...mapGetters({
  Token: 'get_token',
  vuex_items: 'get_items',
  emoticonNumber: 'get_emoticonNumber',
  emoticonPack: 'get_emoticonPack'}),
  },
  watch: {
     loaded: function() {
        this.updateGUI(this.emoticonPack,this.vuex_items,this.emoticonNumber)
     }
  },
  methods: {
    // Method that updates GUI after data from backed have been fetched.
    updateGUI(emoticon, array, number) {
     var newArray = array.filter((item)=>{
        return item.title == emoticon && (item.number.includes(number));
      });
      this.items = [...newArray];
    },
    // Async function that will get live settings from backend and update it.
    async waitForSettings() {
      this.updateGUISettingsAction(await Services.getSettings(this.Token));
      setTimeout(()=>{this.loaded = true;},1500)
    },
    // Method that sends client reaction to backend.
     insertReaction() {
       this.emoji = event.target.id;
       Services.insertReaction(this.emoji,this.Token)
       setTimeout(()=>{
         this.$router.push('/thanks');
     },1000)
    },
    ...mapActions([ // calling mutation that will update GUI Settings in vuex.
    'updateGUISettingsAction'
     ]),
  },
  created : function(){
    // Calling methods of fetching updated settings and loading simultaneously.
    this.waitForSettings()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  overflow: hidden;
  color:#FBEEC1
}
.background {
  min-height: 100vh;
}
.none{
  display:none;
}
ul#horizontal-list li {
	display: inline-block;
	}
li img {
  border-radius: 100px 100px 100px 100px;
  -moz-border-radius: 100px 100px 100px 100px;
  -webkit-border-radius: 100px 100px 100px 100px;
  background-color: hsla(47, 88%, 87%, 0.065);
  width: 4vw;
  padding: 1vw;
  margin: 1vw;
  animation-delay: 5s;
  animation: fadeIn 2s linear;
}
@keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}
@media screen and (max-width: 1024px) {
  li img {
  border-radius: 150px 150px 150px 150px;
  -moz-border-radius: 100px 100px 100px 100px;
  -webkit-border-radius: 100px 100px 100px 100px;
  background-color: hsla(47, 88%, 87%, 0.065);
  width: 7vw;
  padding: 1.5vw;
  margin: 3vw;
  animation-delay: 5s;
  animation: fadeIn 2s linear;
  }
}
</style>

