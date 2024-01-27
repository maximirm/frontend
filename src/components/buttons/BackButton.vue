<template>
  <StyledButton
      :onClickMethod="goBack"
      width="100"
      label="Zurück"
      :class="'logout-btn'"/>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";

export default {
  name: "LogoutButton",
  components: {
    StyledButton
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  },
}
</script>
