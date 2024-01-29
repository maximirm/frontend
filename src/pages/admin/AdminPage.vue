<template>
  <BoxWrapper
      height="700px"
      width="500px">
    <div class="admin-page">
      <div class="admin-form">
        <h2>Nutzer</h2>
      </div>

      <UserCatalogWithExport
          :users="users"
          :selectedUser="selectedUser"
          :selectFunction="selectUser"/>


      <div class="button-container">
        <FeedbackMessageWrapper>
          <FeedbackMessage
              v-if="feedbackMessage"
              :messageType="'success'"
              :message="feedbackMessage"/>
        </FeedbackMessageWrapper>
        <StyledButton
            :label="'Delete Selected User'"
            :onClickMethod="deleteSelectedUser"
            :isDisabled="!selectedUser || selfSelected"
            :class="'red-btn'"/>
      </div>
    </div>
  </BoxWrapper>
</template>

<script>
import FeedbackMessage from "@/components/generic/FeedbackMessage.vue";
import {deleteUser, fetchAllUsers} from "@/scripts/api/userApi";
import {fetchSurveysByCreatorId} from "@/scripts/api/surveyApi";
import StyledButton from "@/components/buttons/StyledButton.vue";
import UserCatalogWithExport from "@/components/catalogs/UserCatalogWithExport.vue";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";
import FeedbackMessageWrapper from "@/components/generic/FeedbackMessageWrapper.vue";

export default {
  components: {
    FeedbackMessageWrapper,
    BoxWrapper,
    StyledButton,
    FeedbackMessage,
    UserCatalogWithExport
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      feedbackMessage: '',
      selfSelected: false,

    };
  },
  mounted() {
    this.displayListOfUsers();
  },

  methods: {
    async displayListOfUsers() {
      try {
        const token = this.$store.state.userToken;
        const allUsers = await fetchAllUsers(token);
        this.users = await Promise.all(
            allUsers.map(async (user) => {
              const surveys = await fetchSurveysByCreatorId(token, user.id);
              return {
                ...user,
                numberOfSurveys: surveys.length,
              };
            })
        );
      } catch (error) {
        alert("Fehler beim Laden der Nutzer - Bitte neu einloggen");
        this.redirectToLandingPage();
      }
    },
    selectUser(user) {
      this.checkIfSelfSelected(user.id);
      this.selectedUser = user;
    },
    checkIfSelfSelected(id) {
      this.selfSelected = false;
      const selfId = this.$store.state.userId;
      if (selfId === id) {
        this.selfSelected = true;
      }
    },
    async deleteSelectedUser() {
      const token = this.$store.state.userToken;
      await deleteUser(token, this.selectedUser.id);
      this.feedbackMessage = "Benutzer erfolgreich gelöscht";
      setTimeout(() => this.feedbackMessage = '', 3000);
      this.selectedUser = null;
      await this.displayListOfUsers();
    },
    redirectToLandingPage() {
      this.$router.push({name: 'LandingPage'});
    },
  },
};
</script>

<style scoped>

.admin-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  overflow: hidden;

}

.admin-form {
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
