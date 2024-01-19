<template>
  <div class="login-page">
    <h2>Registrierung</h2>
    <InputLabel
        :label="'Benutzername:'"
        :model="username"
        :inputId="'username'"
        :inputType="'text'"
        @update:model="updateName"/>
    <InputLabel
        :label="'Passwort:'"
        :model="password"
        :inputId="'password'"
        :inputType="'password'"
        @update:model="updatePassword"/>
    <DropdownMenu
        :title="dropdownTitle"
        :options="dropdownOptions"
        :selectedOption="role"
        @update:selectedOption="handleRoleChange"/>
    <BaseButton
        :click-handler="register"
        :button-text="'Registrieren'"
        :is-disabled="username === '' || password===''"/>
    <LogoutButton
        :button-text="'Zurück zur Startseite'"/>
    <FeedbackMessage
        v-if="registrationAttempted"
        :message="registrationError ? registrationError : 'Registrierung Erfolgreich'"
        :message-class="registrationError ? 'error' : 'success'"/>
  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import {registerUser} from "@/api/userApi";
import BaseButton from "@/components/BaseButton.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import FeedbackMessage from "@/components/FeedbackMessage.vue";

export default {
  components: {FeedbackMessage, LogoutButton, BaseButton, DropdownMenu, InputLabel},
  data() {
    return {
      username: '',
      password: '',
      role: 'admin',
      registrationSuccess: false,
      registrationError: null,
      registrationAttempted: false,
    };
  },
  computed: {
    dropdownTitle() {
      return 'Benutzerrolle auswählen:'
    },
    dropdownOptions() {
      return ['admin', 'editor', 'respondent']
    },
  },
  methods: {
    handleRoleChange(newRole) {
      this.role = newRole;
    },
    updateName(newVal) {
      this.username = newVal
    },
    updatePassword(newVal) {
      this.password = newVal
    },
    async register() {
      this.registrationAttempted = true;
      this.registrationError = null;
      if (this.username === '' && this.password === '') {
        this.registrationError = `Fehler bei der Registrierung: Bitte Benutzername und Passwort eingeben`;
        return
      }
      try {
        await registerUser(this.username, this.password, this.role)
        this.registrationSuccess = true;
        setTimeout(() => {
          this.redirectToLandingPage();
        }, 1000);

      } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
          this.registrationError = `Fehler bei der Registrierung: ${error.response.status} - ${error.response.data.detail}`;
        }
        this.registrationSuccess = false;
      }
    },
    redirectToLandingPage() {
      this.$router.push({name: 'LandingPage'});
    },
  },
};
</script>

<style scoped>

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
