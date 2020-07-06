<template>
  <div id="app">
    <div id="nav">

    </div>
    <vue-page-transition name="overlay-up">
    <router-view/>
    </vue-page-transition>
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
  overflow: hidden;
}

body {
    background: linear-gradient(-45deg, #3194ce, #4d3ce7, #217292, #3662dd);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
