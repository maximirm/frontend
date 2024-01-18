<template>
  <div class="login-page">
    <h2>Login</h2>

    <InputLabel label="Benutzername:" :model="name" inputId="name" @update:model="updateName" />
    <InputLabel label="Passwort:" :model="password" inputId="password" :inputType="'password'" @update:model="updatePassword" />

    <ButtonGroup :buttons="buttons" />

    <div v-if="loginError" class="error-message">
      {{ loginError }}
    </div>

    <div v-if="loginSuccess" class="success-message">
      Login erfolgreich!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ButtonGroup from "@/components/ButtonGroup.vue";
import InputLabel from "@/components/InputLabel.vue";

export default {
  components: {
    InputLabel,
    ButtonGroup,
  },
  data() {
    return {
      name: '',
      password: '',
      loginError: null,
      loginSuccess: false,
    };
  },
  computed: {
    buttons() {
      return [
        {text: 'Login', clickHandler: this.login},
        {text: 'Zurück zur Startseite', clickHandler: this.redirectToHomePage},
      ];
    },
  },
  methods: {
    updateName(newVal){
      this.name = newVal
    },
    updatePassword(newVal) {
      this.password = newVal
    },
    async login() {
      this.loginError = null;
      try {
        const response = await axios.post('http://127.0.0.1:8002/users/login/', {
          name: this.name,
          password: this.password,
        });

        if (response.status === 200) {
          this.$store.commit('setUserToken', response.data.token);
          this.$store.commit('setUserId', response.data.id);
          this.loginSuccess = true;

          setTimeout(() => {
            this.redirectBasedOnRole(response.data.role);
          }, 1000);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
          this.loginError = `Fehler beim Login: ${error.response.status} - ${error.response.data.detail}`;
        } else {
          this.loginError = `Fehler beim Login: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
        }

        this.loginSuccess = false;
      }
    },

    redirectBasedOnRole(role) {
      switch (role) {
        case 'admin':
          this.$router.push({ name: 'AdminPage' });
          break;
        case 'editor':
          this.$router.push({ name: 'EditorPage' });
          break;
        case 'respondent':
          this.$router.push({ name: 'RespondentPage' });
          break;
        default:
          console.error('Unbekannte Rolle:', role);
      }
    },
    redirectToHomePage() {
      this.$router.push({ name: 'LandingPage' });
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}


</style>
