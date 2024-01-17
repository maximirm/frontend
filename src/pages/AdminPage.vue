<template>
  <div class="admin-page">
    <h2>Admin</h2>

    <ButtonGroup :buttons="buttons" />
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

    <BaseButton
        :buttonText="'Delete Selected User'"
        :clickHandler="deleteSelectedUser"
        :isDisabled="!selectedUser || selfSelected"
        class="delete-btn"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ButtonGroup from "@/components/ButtonGroup.vue";
import UserInfo from "@/components/UserInfo.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {BaseButton, ButtonGroup, UserInfo },
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
        { text: 'Benutzer anzeigen', clickHandler: this.showAllUsers },
        { text: 'Zurück zur Startseite', clickHandler: this.redirectToHomePage },
      ];
    },
  },
  methods: {

    async showAllUsers() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8002/users/all/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.users = await Promise.all(
            response.data.map(async (user) => {
              const surveys = await this.getSurveysByCreatorId(user.id);
              return {
                ...user,
                numberOfSurveys: surveys.length,
              };
            })
        );
      } catch (error) {
        console.error('Fehler beim Abrufen aller Benutzer:', error);
      }
    },

    selectUser(user) {
      this.checkIfSelfSelected(user.id)
      this.selectedUser = user;
    },
    checkIfSelfSelected(id){
      this.selfSelected = false
      const selfId = localStorage.getItem("user-id")
      if(selfId === id) {
        this.selfSelected = true
      }
    },

    async deleteSelectedUser() {
      if (!this.selectedUser) return;

      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8002/users/${this.selectedUser.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.selectedUser = null;
          await this.showAllUsers();
          this.message = "Benutzer erfolgreich gelöscht"; // Setzen der Meldung
          setTimeout(() => this.message = '', 3000); // Meldung nach 3 Sekunden ausblenden
        }
      } catch (error) {
        this.message = "Fehler beim Löschen des Benutzers"; // Meldung im Fehlerfall
      }
    },

    async getSurveysByCreatorId(creatorId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8002/surveys/by_creator/${creatorId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        console.error(`Fehler beim Abrufen der Umfragen für Benutzer mit ID ${creatorId}:`, error);
        return [];
      }
    },

    redirectToHomePage() {
      this.$router.push({ name: 'LandingPage' });
    },
  },
};
</script>

<style scoped>

.success-message {
  color: green;
  margin-top: 10px;
}
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
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid #444; /* Subtile Grenze */
}



.delete-btn {
  background-color: #d32f2f; /* Lebendige rote Farbe für Löschen-Button */
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
