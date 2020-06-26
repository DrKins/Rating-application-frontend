<template>
  <div id="app">
    <div id="nav">

    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
*{
  font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  padding: 0px;
}

body {
background: rgb(55,128,189);
background: radial-gradient(circle, rgba(55,128,189,1) 0%, rgba(71,111,195,1) 100%);
}

</style>
