<template>
    <BaseButton
        :click-handler="logout"
        :button-text="buttonText"/>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
  name: "LogoutButton",
  components: {BaseButton},
  props: {
    buttonText: {
      type: String,
      default: 'Logout',
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('resetStore');
      this.$router.push({name: 'LandingPage'});
    },
  }
}

</script>

