<template>
  <BoxWrapper
      height="400px"
      width="400px">
    <div class="login-page">
      <div class="login-form">
        <h2>Login</h2>
        <InputField
            :label="'Benutzername: '"
            :reponse="name"
            @update:response="updateName"/>
        <InputField
            :label="'Passwort:'"
            :reponse="password"
            :inputType="'password'"
            @update:response="updatePassword"/>

        <div class="button-container">
          <FeedbackMessageWrapper>
            <FeedbackMessage
                v-if="loginAttempted"
                :message="loginError ? loginError : 'Login erfolgreich!'"
                :messageType="loginError ? 'error' : 'success'"/>
          </FeedbackMessageWrapper>
          <StyledButton
              :on-click-method="login"
              :label="'Login'"
              :isDisabled="name === '' || password === ''"
              :class="'green-btn'"/>
        </div>

      </div>
    </div>
  </BoxWrapper>
</template>


<script>
import FeedbackMessage from "@/components/generic/FeedbackMessage.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import InputField from "@/components/generic/InputField.vue";
import {login} from "@/scripts/api/userApi";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";
import FeedbackMessageWrapper from "@/components/generic/FeedbackMessageWrapper.vue";

export default {
  components: {
    FeedbackMessageWrapper,
    BoxWrapper,
    InputField,
    StyledButton,
    FeedbackMessage,
  },
  created() {
    this.name = this.$store.state.username ? this.$store.state.username : '';
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
          this.$router.push({name: 'RespondentPage'});
          break;
        default:
          this.$router.push({name: 'LandingPage'});
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
  height: 80vh;
  overflow: hidden;

}

.login-form {
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

</style>
