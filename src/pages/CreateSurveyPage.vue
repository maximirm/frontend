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
      surveyFormVisible: true,
      questionOrder: 1, // Anfangsorder-Wert
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

    async createQuestion(questionData) {
      try {
        const token = localStorage.getItem('token');
        const surveyId = localStorage.getItem('survey-created-id');

        const question = {
          survey_id: surveyId,
          order: this.questionOrder,
          question_text: questionData.questionText,
          type: questionData.questionType, // Wandeln Sie den Wert in einen Integer um
          options: questionData.questionType === 1 ? [] : questionData.options,
        };

        const response = await axios.post('http://127.0.0.1:8002/questions/', question, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Erhöhen Sie die questionOrder für die nächste Frage
          this.questionOrder++;

          // Konsolenausgabe zur Bestätigung (kann entfernt werden)
          console.log('Frage erstellt:', question);

          // Setzen Sie hier die Logik fort, um mit der neu erstellten Frage zu arbeiten
        }
      } catch (error) {
        console.error('Fehler beim Erstellen der Frage:', error);
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

.btn {
  margin-top: 20px;
}
</style>
