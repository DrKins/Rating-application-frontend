<template>
  <div class="user">
  <message />
  <emoticons/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import message from '@/components/message.vue'
import emoticons from '@/components/emoticons.vue'
export default {
  name: 'User',
  components: {
    message,
    emoticons
  },
  computed: {
      ...mapGetters({
        getToken : 'get_token',
      }),
    },
  methods: {
    // Method that redirects from current page to login.
    reloading() {
       this.$router.push('/');
        setTimeout(()=>{
          location.reload();
        },1000)
     },
    checkToken(){
      if(this.getToken === '') {
        this.reloading();
      }
    }
  },
  created(){
    this.checkToken();
  }  
}
</script>
<style scoped>

</style>