<template>
  <div class="login-page">
    <h2>Registrierung</h2>

    <InputLabel label="Benutzername:" :model="username" inputId="username" :inputType="'text'" @update:model="updateName" />
    <InputLabel label="Passwort:" :model="password" inputId="password" :inputType="'password'" @update:model="updatePassword" />
    <DropdownMenu :title="dropdownTitle" :options="dropdownOptions" :selectedOption="role" @update:selectedOption="handleRoleChange" />



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
import InputLabel from "@/components/InputLabel.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  components: {DropdownMenu, InputLabel, ButtonGroup},
  data() {
    return {
      username: '',
      password: '',
      role: 'admin',
      registrationSuccess: false,
      registrationError: null,
    };
  },
  computed: {
    dropdownTitle() {
      return 'Benutzerrolle auswählen:'
    },
    dropdownOptions() {
      return [
        { label: 'Admin', value: 'admin', id: 'admin' },
        { label: 'Editor', value: 'editor', id: 'editor' },
        { label: 'Respondent', value: 'respondent', id: 'respondent' },
      ];
    },
    buttons() {
      return [
        {text: 'Registrieren', clickHandler: this.register},
        {text: 'Zurück zur Startseite', clickHandler: this.redirectToHomePage},
      ];
    },
  },
  methods: {
    handleRoleChange(newRole) {
      this.role = newRole;
    },
    updateName(newVal){
      this.username = newVal
    },
    updatePassword(newVal) {
      this.password = newVal
    },
    async register() {
      this.registrationError = null;
      if (this.username === '' && this.password === ''){

        this.registrationError = `Fehler bei der Registrierung: Bitte Benutzername und Passwort eingeben`;
        return
      }
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

input[type="radio"] {
  margin-right: 5px;
}

</style>
