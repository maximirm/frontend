<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>


<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  margin: 0;
  background-image: url('styling/pattern/denim.webp');
  background-repeat: repeat;
  background-position: top left;
  color: #F0F8FF;
  overflow-x: hidden;
  padding: 0;
  width: 100%;
  height: 100%;
}

</style>

