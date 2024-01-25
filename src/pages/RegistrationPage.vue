<template>
  <div class="login-page">
    <div class="registration-form">
    <h2>Registrierung</h2>
    <InputField
        :label="'Benutzername:'"
        :model="username"
        @update:model="updateName"/>
    <InputField
        :label="'Passwort:'"
        :model="password"
        :inputType="'password'"
        @update:model="updatePassword"/>
    <DropdownMenu
        :title="dropdownTitle"
        :options="dropdownOptions"
        :selectedOption="role"
        @update:selectedOption="handleRoleChange"/>
      <div class="button-container">
    <StyledButton
        :onClickMethod="register"
        :label="'Registrieren'"
        :isDisabled="username === '' || password===''"
        :class="'green-btn'"/>
    <LogoutButton
        :label="'Zur Startseite'"/>
      </div>
    <FeedbackMessage
        v-if="registrationAttempted"
        :message="registrationError ? registrationError : 'Registrierung Erfolgreich'"
        :messageType="registrationError ? 'error' : 'success'"/>
  </div>
  </div>
</template>

<script>
import DropdownMenu from "@/components/general/DropdownMenu.vue";
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import InputField from "@/components/general/InputField.vue";
import {registerUser} from "@/scripts/api/userApi";

export default {
  components: {
    InputField,
    StyledButton,
    FeedbackMessage,
    LogoutButton,
    DropdownMenu,
  },
  data() {
    return {
      username: '',
      password: '',
      role: '',
      registrationSuccess: false,
      registrationError: null,
      registrationAttempted: false,
    };
  },
  computed: {
    dropdownTitle() {
      return 'Benutzerrolle';
    },
    dropdownOptions() {
      return ['admin', 'editor', 'respondent'];
    },
  },
  methods: {
    handleRoleChange(newRole) {
      this.role = newRole;
    },
    updateName(newVal) {
      this.username = newVal;
    },
    updatePassword(newVal) {
      this.password = newVal;
    },
    async register() {
      this.registrationAttempted = true;
      this.registrationError = null;
      if (this.username === '' && this.password === '') {
        this.registrationError = `Fehler bei der Registrierung: Bitte Benutzername und Passwort eingeben`;
        return;
      }
      try {
        await registerUser(this.username, this.password, this.role);
        this.registrationSuccess = true;
        setTimeout(() => {
          this.redirectToLoginPage();
        }, 1000);

      } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
          this.registrationError = `Fehler bei der Registrierung: ${error.response.status} - ${error.response.data.detail}`;
        }
        this.registrationSuccess = false;
      }
    },
    redirectToLoginPage() {
      this.$store.commit('setUserName', this.username)
      this.$router.push({name: 'LoginPage'});
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
}

.registration-form {
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
</style>
