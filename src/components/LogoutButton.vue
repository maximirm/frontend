<template>
 <div>
   <BaseButton :click-handler="logout" :button-text="buttonText"/>
 </div>
</template>
<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "LogoutButton",
  components: {BaseButton},
  props: {
    buttonText: {
      type: String,
      default: 'Logout'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('resetStore')
      this.$router.push({name: 'LandingPage'});
    },
  }
}

</script>

<style scoped>

</style>
