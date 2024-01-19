<template>
  <div class="login-page">
    <h2>Login</h2>
    <InputLabel
        :label="'Benutzername: '"
        :model="name"
        :inputId="'name'"
        @update:model="updateName"/>
    <InputLabel
        :label="'Passwort:'"
        :model="password"
        :inputId="'password'"
        :inputType="'password'"
        @update:model="updatePassword"/>
    <BaseButton
        :click-handler="login"
        :button-text="'Login'"
        :is-disabled="name === '' || password === ''"/>
    <LogoutButton
        :button-text="'Zur Startseite'"/>
    <FeedbackMessage
        v-if="loginAttempted"
        :message="loginError ? loginError : 'Login erfolgreich!'"
        :message-class="loginError ? 'error' : 'success'"/>
  </div>
</template>

<script>
import InputLabel from "@/components/utils/InputLabel.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import {login} from "@/api/userApi";
import FeedbackMessage from "@/components/utils/FeedbackMessage.vue";
import LogoutButton from "@/components/buttons/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
    FeedbackMessage,
    BaseButton,
    InputLabel,
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
          this.$router.push({name: 'RespondentPage', params: {isAnonymous: false}});
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
