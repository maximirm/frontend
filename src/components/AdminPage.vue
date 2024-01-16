<!-- src/views/AdminPage.vue -->

<template>
  <div class="admin-page">
    <h2>Admin</h2>

    <button @click="showAllUsers" class="btn">Show All Users</button>
    <button @click="redirectToHomePage" class="btn">Zurück zur Startseite</button>


    <div v-if="users.length > 0" class="user-list-box">
      <div v-for="user in users" :key="user.id" class="user-item">
        <div class="user-info">
          <p>Name: {{ user.name }}</p>
          <p>Rolle: {{ user.role }}</p>
          <p>Anzahl der Umfragen: {{ user.numberOfSurveys }}</p>
          <p>ID: {{ user.id }}</p>
        </div>
        <button
            @click="deleteUser(user.id, user.name)"
            :disabled="user.token === currentUserToken"
            class="btn delete-btn"
        >
          Delete User and Surveys
        </button>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      deletedUser: '',
      currentUserToken: '',
    };
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
        this.currentUserToken = token;
      } catch (error) {
        console.error('Fehler beim Abrufen aller Benutzer:', error);
      }
    },

    async deleteUser(userId, userName) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8002/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.deletedUser = userName;



          setTimeout(() => {
            this.deletedUser = '';
          }, 5000);
        }
      } catch (error) {
        console.error(`Fehler beim Löschen des Benutzers mit ID ${userId}:`, error);
      }
      await this.showAllUsers();
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

.admin-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.user-list-box {
  max-height: 600px;
  overflow-y: auto; /* Scrollen nur, wenn die Liste zu groß ist */
  margin-top: 20px;
}

.user-item {
  border: 1px solid #555;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;

}

.user-info p {
  margin-bottom: 1px;
  margin-top: 1px;
  padding: 1px;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.delete-btn {
  background-color: red;
}


.delete-btn:disabled {
  background-color: #999; /* Hintergrundfarbe für deaktivierte Buttons */
  cursor: not-allowed;
}
</style>
