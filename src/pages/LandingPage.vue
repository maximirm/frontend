<template>
  <BoxWrapper
      height="400px"
      width="400px">

    <div class="landing-page">
    <h2>Willkommen</h2>
      <StyledButton
          label="Login"
          :on-click-method="redirectToLogin"
          class="green-btn"/>
      <StyledButton
          label="Registrieren"
          :on-click-method="redirectToRegister"
          class="green-btn"/>
      <StyledButton
          label="Anonym beantworten"
          :on-click-method="respondAnonymous"
          class="green-btn"/>
    </div>
  </BoxWrapper>
</template>

<script>
import BoxWrapper from "@/components/general/BoxWrapper.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";

export default {
  components: {
    StyledButton,
    BoxWrapper,
  },
  methods: {
    redirectToLogin() {
      this.$router.push({name: 'LoginPage'});
    },
    redirectToRegister() {
      this.$router.push({name: 'RegisterPage'});
    },
    respondAnonymous() {
      this.$router.push({name: 'RespondentPage'});
    },
  },
};
</script>

<style scoped>

.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

</style>
