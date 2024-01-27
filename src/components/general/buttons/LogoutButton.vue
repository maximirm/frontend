<template>
  <StyledButton
      :onClickMethod="logoutUser"
      width="100"
      label="Logout"
      :class="'logout-btn'"/>
</template>

<script>
import StyledButton from "@/components/general/buttons/StyledButton.vue";

export default {
  name: "LogoutButton",
  components: {
    StyledButton
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('resetStore');
      this.$router.push({
        name: 'LandingPage'
      });
    },
  }
}
</script>
