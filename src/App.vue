<template>
  <div id="outer-box">
    <header class="top-bar">
      <BackButton
          v-if="showGoBack"/>
      <LogoutButton
          v-if="showLogout"/>
    </header>

    <div id="app">
      <router-view/>
    </div>
  </div>
</template>


<script>

import LogoutButton from "@/components/general/buttons/LogoutButton.vue";
import BackButton from "@/components/general/buttons/BackButton.vue";

export default {
  name: "App",
  components: {
    LogoutButton,
    BackButton
  },
  computed: {
    showLogout() {
      return this.$route.meta.showLogout;
    },
    showGoBack() {
      return this.$route.meta.showGoBack;
    }
  },
};
</script>

<style>

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: #1A237E;
}

#outer-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('styling/pics/mountains.jpg');
  background-size: cover;
  overflow: hidden;
}

.top-bar {
  height: 60px;
  background-color: #bad6ee;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

