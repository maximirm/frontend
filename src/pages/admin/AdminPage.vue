<template>
  <div class="admin-page">
    <h2>Admin</h2>
    <LogoutButton/>
    <FeedbackMessage
        v-if="message"
        :message-class="'success'"
        :message="message"/>
    <UserList
        :show-file-export="true"
        :list-title="listTitle"
        :pdf-columns="pdfColumns"
        :users="users"
        :selectedUser="selectedUser"
        @userSelected="selectUser"/>
    <div v-if="selectedUser">
      <BaseButton
          :buttonText="'Delete Selected User'"
          :clickHandler="deleteSelectedUser"
          :isDisabled="!selectedUser || selfSelected"
          class="delete-btn"/>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";
import LogoutButton from "@/components/buttons/LogoutButton.vue";
import FeedbackMessage from "@/components/utils/FeedbackMessage.vue";
import {deleteUser, fetchAllUsers} from "@/api/userApi";
import {fetchSurveysByCreatorId} from "@/api/surveyApi";
import UserList from "@/components/lists/UserList.vue";

export default {
  components: {UserList, FeedbackMessage, LogoutButton, BaseButton},
  data() {
    return {
      users: [],
      selectedUser: null,
      message: '',
      selfSelected: false,
      pdfColumns: [
        {header: "ID", dataKey: "id", width: 40},
        {header: "Name", dataKey: "name", width: 30},
        {header: "Rolle", dataKey: "role", width: 50},
        {header: "Anzahl der Umfragen", dataKey: "numberOfSurveys", width: 50}
      ],
      listTitle: "Benutzerliste"
    };
  },
  mounted() {
    this.displayListOfUsers();
  },
  computed: {
    mappedDataForExport() {
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
      return data
    },
  },
  methods: {
    async displayListOfUsers() {
      try {
        const token = this.$store.state.userToken;
        const allUsers = await fetchAllUsers(token);
        this.users = await Promise.all(
            allUsers.map(async (user) => {
              const surveys = await fetchSurveysByCreatorId(token, user.id)
              return {
                ...user,
                numberOfSurveys: surveys.length,
              };
            })
        );
      } catch (error) {
        alert("Fehler im Laden der Nutzer - Bitte neu einloggen")
        this.redirectToLandingPage()
      }
    },
    selectUser(user) {
      this.checkIfSelfSelected(user.id)
      this.selectedUser = user;
    },
    checkIfSelfSelected(id) {
      this.selfSelected = false
      const selfId = this.$store.state.userId;
      if (selfId === id) {
        this.selfSelected = true
      }
    },
    async deleteSelectedUser() {
      const token = this.$store.state.userToken;
      await deleteUser(token, this.selectedUser.id)
      this.message = "Benutzer erfolgreich gelöscht";
      setTimeout(() => this.message = '', 3000);
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
