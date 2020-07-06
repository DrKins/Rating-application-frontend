<template>
  <div class="user">
  <logo />
  <message />
  <emoticons />
  </div>
</template>

<script>
// @ is an alias to /src
import logo from '@/components/logotype.vue'
import message from '@/components/message.vue'
import emoticons from '@/components/emoticons.vue'

export default {
  name: 'User',
  components: {
    logo,
    message,
    emoticons
  }
}
</script>
