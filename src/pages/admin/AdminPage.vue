<template>
  <div class="admin-page">
    <h2>Admin</h2>
    <LogoutButton/>
    <UserCatalogWithExport
        :label="catalogLabel"
        :mappedUserData="mappedUserData"
        :pdfColumnDefinition="pdfColumnDefinition"
        :selectFunction="selectUser"
        :selectedUser="selectedUser"
        :users="users"/>
    <FeedbackMessage
        v-if="feedbackMessage"
        :messageType="'success'"
        :message="feedbackMessage"/>
    <StyledButton
        :label="'Delete Selected User'"
        :onClickMethod="deleteSelectedUser"
        :isDisabled="!selectedUser || selfSelected"
        :class="'red-btn'"/>
  </div>
</template>

<script>
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import {deleteUser, fetchAllUsers} from "@/scripts/api/userApi";
import {fetchSurveysByCreatorId} from "@/scripts/api/surveyApi";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import UserCatalogWithExport from "@/components/catalogs/UserCatalogWithExport.vue";

export default {
  components: {
    StyledButton,
    FeedbackMessage,
    LogoutButton,
    UserCatalogWithExport
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      feedbackMessage: '',
      selfSelected: false,
      pdfColumnDefinition: [
        {header: "ID", dataKey: "id", width: 40},
        {header: "Name", dataKey: "name", width: 30},
        {header: "Rolle", dataKey: "role", width: 50},
        {header: "Anzahl der Umfragen", dataKey: "numberOfSurveys", width: 50}
      ],
      catalogLabel: "Benutzerliste"
    };
  },
  mounted() {
    this.displayListOfUsers();
  },
  computed: {
    mappedUserData() {
      const data = [];
      this.users.forEach((user) => {
        const userData = {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
          numberOfSurveys: user.numberOfSurveys.toString(),
        };
        data.push(userData);
      });
      return data;
    },
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
        alert("Fehler im Laden der Nutzer - Bitte neu einloggen");
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
  height: 100vh;
  color: #fff;
}

.delete-btn {
  background-color: #d32f2f;
}

</style>
