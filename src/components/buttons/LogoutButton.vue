<template>
    <StyledButton
        :onClickMethod="logoutUser"
        :label="label"/>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";

export default {
  name: "LogoutButton",
  components: {
    StyledButton
  },
  props: {
    label: {
      type: String,
      default: 'Logout',
    }
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

