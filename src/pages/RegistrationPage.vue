<template>
  <BoxWrapper
      height="400px"
      width="400px">

    <div class="registration-page">
      <div class="registration-form">
        <h2>Registrierung</h2>
        <InputField
            :label="'Benutzername:'"
            :response="username"
            @update:response="updateName"/>
        <InputField
            :label="'Passwort:'"
            :response="password"
            :inputType="'password'"
            @update:response="updatePassword"/>
        <DropdownMenu
            :label="dropdownTitle"
            :options="dropdownOptions"
            :selectedOption="role"
            @update:selectedOption="handleRoleChange"/>

        <div class="button-container">
          <FeedbackMessageWrapper>
            <FeedbackMessage
                v-if="registrationAttempted"
                :message="registrationError ? registrationError : 'Registrierung Erfolgreich'"
                :messageType="registrationError ? 'error' : 'success'"/>
          </FeedbackMessageWrapper>
          <StyledButton
              :label="'Registrieren'"
              :onClickMethod="register"
              :isDisabled="username === '' || password===''"
              :class="'green-btn'"/>
        </div>


      </div>
    </div>
  </BoxWrapper>
</template>

<script>
import DropdownMenu from "@/components/generic/DropdownMenu.vue";
import FeedbackMessage from "@/components/generic/FeedbackMessage.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import InputField from "@/components/generic/InputField.vue";
import {registerUser} from "@/scripts/api/userApi";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";
import FeedbackMessageWrapper from "@/components/generic/FeedbackMessageWrapper.vue";

export default {
  components: {
    FeedbackMessageWrapper,
    BoxWrapper,
    InputField,
    StyledButton,
    FeedbackMessage,
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

.registration-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  overflow: hidden;
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
