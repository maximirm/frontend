<template>
  <div class="create-survey-page">
    <!-- Anzeigen des CreateSurveyForm, wenn surveyFormVisible true ist -->
    <div v-if="surveyFormVisible">
      <CreateSurveyForm
          :title="title"
          :description="description"
          @create-survey="createSurvey"
      />
    </div>

    <!-- Anzeigen des CreateQuestionForm, wenn surveyFormVisible false ist -->
    <div v-else>
      <CreateQuestionForm
          @create-question="createQuestion"
      />
    </div>

    <button @click="goToEditorPage" class="btn go-back-btn">Zurück zur Editorseite</button>
  </div>
</template>

<script>
import CreateSurveyForm from "@/components/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/CreateQuestionForm.vue";
import axios from 'axios';

export default {
  components: {
    CreateSurveyForm,
    CreateQuestionForm,
  },
  data() {
    return {
      title: '',
      description: '',
      surveyFormVisible: true, // Diese Variable steuert die Anzeige der Formulare
    };
  },
  methods: {
    goToEditorPage() {
      this.$router.push({ name: 'EditorPage' });
    },

    async createSurvey(data) {
      try {
        const token = localStorage.getItem('token');
        const creator_id = localStorage.getItem('user-id');

        const response = await axios.post('http://127.0.0.1:8002/surveys/', {
          title: data.title,
          description: data.description,
          creator_id: creator_id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.setItem('survey-created-id', response.data.id);

          // Survey-Form ausblenden und Question-Form einblenden
          this.surveyFormVisible = false;
        }
      } catch (error) {
        console.error('Fehler beim Erstellen der Umfrage:', error);
      }
    },

    // Diese Methode verarbeitet die erstellte Frage
    createQuestion(questionData) {
      // Fügen Sie hier die Logik zur Verarbeitung der Frage ein
      console.log('Frage erstellt:', questionData);
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

.btn {
  margin-top: 20px;
}
</style>
