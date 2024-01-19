<template>
  <div class="admin-page">
    <h2>Admin</h2>
    <ButtonGroup :buttons="buttons"/>
    <div v-if="message" class="success-message">{{ message }}</div>
    <div class="user-list-box">
      <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          :isSelected="selectedUser && user.id === selectedUser.id"
          @userSelected="selectUser"
      />
    </div>
    <div v-if="selectedUser">
      <BaseButton
          :buttonText="'Delete Selected User'"
          :clickHandler="deleteSelectedUser"
          :isDisabled="!selectedUser || selfSelected"
          class="delete-btn"
      />
    </div>
  </div>
</template>
<script>
import ButtonGroup from "@/components/ButtonGroup.vue";
import UserInfo from "@/components/UserInfo.vue";
import BaseButton from "@/components/BaseButton.vue";
import {deleteUser, fetchAllUsers, fetchSurveysByCreatorId} from "@/api/api";

export default {
  components: {BaseButton, ButtonGroup, UserInfo},
  data() {
    return {
      users: [],
      selectedUser: null,
      message: '',
      selfSelected: false,
    };
  },
  computed: {
    buttons() {
      return [
        {text: 'Benutzer anzeigen', clickHandler: this.displayListOfUsers},
        {text: 'Zurück zur Startseite', clickHandler: this.redirectToLandingPage},
      ];
    },
  },
  methods: {
    async displayListOfUsers() {
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
      await deleteUser(this.selectedUser.id)
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
  max-height: 600px;
  width: 1200px;
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

.success-message {
  color: green;
  margin-top: 10px;
}

.delete-btn {
  background-color: #d32f2f;
}
</style>
