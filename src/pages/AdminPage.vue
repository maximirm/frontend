<template>
  <div class="admin-page">
    <h2>Admin</h2>
    <BaseButton
        :click-handler="displayListOfUsers"
        :button-text="listTitle + buttonAction"/>
    <FileExport
        :pdfData="mappedDataForExport"
        :csvData="mappedDataForExport"
        :pdfColumns="pdfColumns"
        :fileName="listTitle"/>
    <LogoutButton/>
    <FeedbackMessage
        v-if="message"
        :message-class="'success'"
        :message="message"/>

    <div class="user-list-box">
      <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          :isSelected="selectedUser && user.id === selectedUser.id"
          @userSelected="selectUser"/>
    </div>

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
import UserInfo from "@/components/UserInfo.vue";
import BaseButton from "@/components/BaseButton.vue";
import FileExport from "@/components/FileExport.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import FeedbackMessage from "@/components/FeedbackMessage.vue";
import {deleteUser, fetchAllUsers} from "@/api/userApi";
import {fetchSurveysByCreatorId} from "@/api/surveyApi";

export default {
  components: {FeedbackMessage, LogoutButton, FileExport, BaseButton, UserInfo},
  data() {
    return {
      users: [],
      selectedUser: null,
      message: '',
      selfSelected: false,
      buttonAction: ' anzeigen',
      pdfColumns: [
        {header: "ID", dataKey: "id", width: 40},
        {header: "Name", dataKey: "name", width: 30},
        {header: "Rolle", dataKey: "role", width: 50},
        {header: "Anzahl der Umfragen", dataKey: "numberOfSurveys", width: 50}
      ],
      listTitle: "Benutzerliste"
    };
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
        if (this.users.length !== 0) {
          this.buttonAction = ' aktualisieren'
        }
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

.user-list-box {
  height: 500px;
  width: 800px;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
}

.user-list-box::-webkit-scrollbar {
  width: 8px;
}

.user-list-box::-webkit-scrollbar-thumb {
  background-color: #555;
}

.user-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777;
}

.delete-btn {
  background-color: #d32f2f;
}
</style>
