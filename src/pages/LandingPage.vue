<template>
  <div class="landing-page">
    <h1>Bachelorarbeit Maxim Irmscher</h1>
    <h2>Matr: 548444</h2>

    <ButtonGroup
        :buttons="buttons"/>
  </div>
</template>

<script>
import ButtonGroup from "@/components/buttons/ButtonGroup.vue";

export default {
  components: {
    ButtonGroup
  },
  computed: {
    buttons() {
      return [
        {text: 'Login', clickHandler: this.redirectToLogin},
        {text: 'Registrieren', clickHandler: this.redirectToRegister},
        {text: 'Umfrage anonym beantworten', clickHandler: this.respondAnonymous},
      ];
    },
  },
  methods: {
    redirectToLogin() {
      this.$router.push({name: 'LoginPage'});
    },
    redirectToRegister() {
      this.$router.push({name: 'RegisterPage'});
    },
    respondAnonymous() {
      this.$router.push({name: 'RespondentPage', params: {isAnonymous: true}});
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
  height: 100vh;
  background-color: #333;
  color: #fff;
  margin: 0;
}

</style>
