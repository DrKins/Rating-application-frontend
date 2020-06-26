<template>
  <div class="home">
  <reactions />
  </div>
</template>

<script>
// @ is an alias to /src
import reactions from '@/components/reactions.vue'

export default {
  name: 'Home',
  components: {
    reactions
  }
}
</script>
