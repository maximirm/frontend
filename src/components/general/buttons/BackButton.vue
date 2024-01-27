<template>
  <StyledButton
      :onClickMethod="goBack"
      label="Zurück"
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
    goBack() {
      this.$router.back(); // Tut das gleiche wie go(-1)
    }
  },

}
</script>
<style scoped>


</style>
