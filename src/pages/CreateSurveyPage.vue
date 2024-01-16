<template>
  <div class="create-survey-page">
    <h2>Create Survey</h2>

    <div>
      <label for="title">Titel:</label>
      <input v-model="title" type="text" id="title" />

      <label for="description">Beschreibung:</label>
      <textarea v-model="description" id="description"></textarea>

      <button @click="createSurvey" class="btn">Survey erstellen</button>
    </div>



    <button @click="goToEditorPage" class="btn go-back-btn">Zurück zur Editorseite</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    goToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },

    async createSurvey() {
      try {
        const token = localStorage.getItem('token');
        const creator_id = localStorage.getItem('user-id');

        const response = await axios.post('http://127.0.0.1:8002/surveys/', {
          title: this.title,
          description: this.description,
          creator_id: creator_id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.setItem('survey-created-id', response.data.id)
          this.$router.push({ name: 'CreateQuestionPage' });
        }
      } catch (error) {
        console.error('Fehler beim Erstellen der Umfrage:', error);
      }
    },
  }
};
</script>

<style scoped>
.create-survey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

label {
  margin: 10px 0;
}

input,
textarea {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

.survey-info p {
  margin-bottom: 10px;
}



input[type="radio"] {
  margin-right: 5px;
}

.btn {
  margin-top: 15px;
  margin-left: 2px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.go-back-btn {
  margin-top: 20px;
}
</style>
