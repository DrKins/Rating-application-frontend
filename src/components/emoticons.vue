<template>
  <div class="background">
    <ul id="horizontal-list">
      <li v-for="item in items" :key="item.id">
        <img v-bind:src="item.img" v-bind:alt="item.title" v-bind:class="emoticon" :id="item.id" @click="sendReaction">
      </li>
    </ul>
  </div>
</template>


<script>
//import Services from '../services';
import { mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'emoticons',
    data () {
    return {
      emoticon: "yellowPack",
      items: [],
      emoji: 1
    }
  },
  computed: {
  ...mapMutations({
    update: 'mutateGUISettings'}),
  ...mapGetters({
  Token: 'get_token',
  vuex_items: 'get_items',
  emoticonNumber: 'get_emoticonNumber',
  Niz: 'get_array'})
  },
  mounted(){
        this.updateGUI(this.emoticon,this.vuex_items,this.emoticonNumber)
  },
  methods: {
    updateGUI(emoticon, array, number) {
     var newArray = array.filter((item)=>{
        return item.title == emoticon && (item.number.includes(number));
      });
      this.items = [...newArray];
      console.log(this.items);
    },
    sendReaction() {
      return this.emoji = event.target.id;
    },
    ...mapActions([ // calling mutation that will update token in vuex.
    'updateGUISettingsAction'
     ]),
  },
  created : function(){
    this.updateGUISettingsAction(this.Token)
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
}
</style>

