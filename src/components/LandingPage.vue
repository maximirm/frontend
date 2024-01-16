
<template>
  <div class="landing-page">
    <h1>Willkommen auf unserer Landingpage!</h1>

    <button @click="redirectToLogin" class="btn">Login</button>
    <button @click="redirectToRegister" class="btn">Register</button>
    <button @click="respondAnonymous" class="btn">Respond Anonymous</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToLogin() {
      this.$router.push({ name: 'LoginPage' });
    },
    redirectToRegister() {
      this.$router.push({ name: 'RegisterPage' });
    },
    respondAnonymous() {
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

.btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
