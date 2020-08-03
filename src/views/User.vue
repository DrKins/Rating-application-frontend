<template>
  <div class="user">
    <span id="back" class="gg-close" @click="reloading"> </span>
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
#back {
  position: fixed;
  top: 20px;
  right: 30px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
  0 1px 1px rgba(32, 32, 32, 0.155),
  0 2.1px 2.1px rgba(32, 32, 32, 0.195),
  0 4.4px 4.4px rgba(32, 32, 32, 0.241),
  0 12px 12px rgba(32, 32, 32, 0.35);
}
</style>