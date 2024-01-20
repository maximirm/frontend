<template>
  <div class="login-page">
    <h2>Login</h2>
    <InputField
        :label="'Benutzername: '"
        :model="name"
        :inputId="'name'"
        @update:model="updateName"/>
    <InputField
        :label="'Passwort:'"
        :model="password"
        :inputId="'password'"
        :inputType="'password'"
        @update:model="updatePassword"/>
    <StyledButton
        :on-click-method="login"
        :label="'Login'"
        :isDisabled="name === '' || password === ''"
        :class="'green-btn'"/>
    <LogoutButton
        :label="'Zur Startseite'"/>
    <FeedbackMessage
        v-if="loginAttempted"
        :message="loginError ? loginError : 'Login erfolgreich!'"
        :messageType="loginError ? 'error' : 'success'"/>
  </div>
</template>

<script>
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import InputField from "@/components/general/InputField.vue";
import {login} from "@/scripts/api/userApi";

export default {
  components: {
    InputField,
    StyledButton,
    LogoutButton,
    FeedbackMessage,
  },
  data() {
    return {
      name: '',
      password: '',
      loginError: null,
      loginAttempted: false,
    };
  },
  methods: {
    updateName(newVal) {
      this.name = newVal;
    },
    updatePassword(newVal) {
      this.password = newVal;
    },
    async login() {
      this.loginError = null;
      this.loginAttempted = true;
      try {
        const loginData = await login(this.name, this.password);
        this.$store.commit('setUserToken', loginData.token);
        this.$store.commit('setUserId', loginData.id);

        setTimeout(() => {
          this.redirectBasedOnRole(loginData.role);
        }, 1000);
      } catch (error) {
        this.loginError = `Fehler beim Login: ${error.response.status} - ${error.response.data.detail}`;
      }
    },

    redirectBasedOnRole(role) {
      switch (role) {
        case 'admin':
          this.$router.push({name: 'AdminPage'});
          break;
        case 'editor':
          this.$router.push({name: 'EditorPage'});
          break;
        case 'respondent':
          this.$router.push({name: 'RespondentPage', params: {respondentIsAnonymous: false}});
          break;
        default:
          console.error('Unbekannte Rolle:', role);
      }
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

</style>
