
<template>
  <div class="landing-page">
    <h1>Bachelorarbeit Maxim Irmscher</h1>
    <ButtonGroup :buttons="buttons" />

  </div>
</template>

<script>
import ButtonGroup from "@/components/ButtonGroup.vue";

export default {
  components: {ButtonGroup},
  computed: {
    buttons() {
      return [
        {text: 'Login', clickHandler: this.redirectToLogin},
        {text: 'Register', clickHandler: this.redirectToRegister},
        {text: 'Respond Anonymous', clickHandler: this.respondAnonymous},
      ];
    },
  },
  methods: {
    redirectToLogin() {
      this.$router.push({ name: 'LoginPage' });
    },
    redirectToRegister() {
      this.$router.push({ name: 'RegisterPage' });
    },
    respondAnonymous() {
      localStorage.clear()
      alert('Anonymous response functionality will be implemented here.');
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
