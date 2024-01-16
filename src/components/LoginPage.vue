
<template>
  <div class="login-page">
    <h2>Login</h2>

    <label for="name">Benutzername:</label>
    <input v-model="name" type="text" id="name" />

    <label for="password">Passwort:</label>
    <input v-model="password" type="password" id="password" />

    <button @click="login" class="btn">Login</button>
    <button @click="redirectToHomePage" class="btn">Zurück zur Startseite</button>

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

export default {
  data() {
    return {
      name: '',
      password: '',
      loginError: null,
      loginSuccess: false,
    };
  },
  methods: {
    async login() {
      this.loginError=null;
      try {
        const response = await axios.post('http://127.0.0.1:8002/users/login/', {
          name: this.name,
          password: this.password,
        });

        if (response.status === 200) {
          // Speichere den Token im Local Storage
          localStorage.setItem('token', response.data.token);

          this.loginSuccess = true;

          setTimeout(() => {
            this.redirectBasedOnRole(response.data.role);
          }, 2000);
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
/* Hier ist das minimalistische Styling für die Login-Seite */
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

.btn {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
