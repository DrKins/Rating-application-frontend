<template>
  <div class="about">
    <h1>Hvala vam na glasanju</h1>
  </div>
</template>
<script>
export default {

mounted: function()
{
   setTimeout(() => {
      this.$router.push('/');
     }, 5000);
}
}
</script>