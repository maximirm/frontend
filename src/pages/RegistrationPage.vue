<template>
  <div class="login-page">
    <h2>Registrierung</h2>

    <label for="username">Benutzername:</label>
    <input v-model="username" type="text" id="username" />

    <label for="password">Passwort:</label>
    <input v-model="password" type="password" id="password" />

    <div class="radio-group">
      <label for="admin">Admin</label>
      <input type="radio" id="admin" v-model="role" value="admin" />

      <label for="editor">Editor</label>
      <input type="radio" id="editor" v-model="role" value="editor" />

      <label for="respondent">Respondent</label>
      <input type="radio" id="respondent" v-model="role" value="respondent" />
    </div>
    <ButtonGroup :buttons="buttons" />


    <div v-if="registrationError" class="error-message">
      {{ registrationError }}
    </div>

    <div v-if="registrationSuccess" class="success-message">
      Erfolgreich registriert!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ButtonGroup from "@/components/ButtonGroup.vue";

export default {
  components: {ButtonGroup},
  data() {
    return {
      username: '',
      password: '',
      role: 'respondent',
      registrationSuccess: false,
      registrationError: null,
    };
  },
  computed: {
    buttons() {
      return [
        {text: 'Registrieren', clickHandler: this.register},
        {text: 'Zurück zur Startseite', clickHandler: this.redirectToHomePage},
      ];
    },
  },
  methods: {
    async register() {
      this.registrationError = null;
      try {
        const response = await axios.post('http://127.0.0.1:8002/users/register/', {
          name: this.username,
          password: this.password,
          role: this.role,
        });

        if (response.status === 200) {
          this.registrationSuccess = true;
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
          this.registrationError = `Fehler bei der Registrierung: ${error.response.status} - ${error.response.data.detail}`;
        } else {
          this.registrationError = `Fehler bei der Registrierung: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
        }

        this.registrationSuccess = false;
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

label {
  margin: 10px 0;
}

input {
  margin: 5px 0;
  padding: 8px;
}

.radio-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

input[type="radio"] {
  margin-right: 5px;
}

</style>
