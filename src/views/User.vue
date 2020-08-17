<template>
  <div class="user">
  <message />
  <emoticons/>
  </div>
</template>

<script>
// @ is an alias to /src
import message from '@/components/message.vue'
import emoticons from '@/components/emoticons.vue'
export default {
  name: 'User',
  components: {
    message,
    emoticons
  },
  methods: {
    // Method that redirects from current page to login.
    reloading() {
      this.$router.push('/');
      location.reload();
    }
  },  
}
</script>
<style scoped>

</style>