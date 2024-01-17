<template>
  <div class="create-survey-page">
    <div class="form-container">
      <div v-if="surveyFormVisible">
        <CreateSurveyForm
            :title="title"
            :description="description"
            @create-survey="createSurvey"
        />
      </div>
      <div v-else>
        <CreateQuestionForm @create-question="createQuestion" />
      </div>
    </div>
    <!-- Anzeigen der Umfrage-Fragen -->
    <div class="question-list-container">
      <h3>{{ surveyTitle }}</h3>
      <p>{{ surveyDescription }}</p>
      <div class="question-list-box">
        <QuestionInfo
            v-for="(question, index) in surveyQuestions"
            :key="index"
            :question-text="question.question_text"
            :question-type="question.type"
            :options="question.options"
        />
      </div>
      <BaseButton
          :buttonText="'Delete Selected Question'"
          :clickHandler="deleteSelectedQuestion"
          :isDisabled="!selectedQuestion"
          class="delete-btn"
      />
    </div>
  </div>
</template>

<script>
import CreateSurveyForm from "@/components/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/CreateQuestionForm.vue";
import axios from 'axios';
import QuestionInfo from "@/components/QuestionInfo.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
    QuestionInfo,
    CreateSurveyForm,
    CreateQuestionForm,
  },
  data() {
    return {
      title: '',
      description: '',
      surveyFormVisible: true,
      questionOrder: 1,
      surveyTitle: "",
      surveyDescription: "",
      surveyQuestions: [],
      selectedQuestion: null,
    };
  },
  methods: {
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
          this.questionOrder++;
          await this.getSurvey()
          console.log('Frage erstellt:', question);
        }
      } catch (error) {
        console.error('Fehler beim Erstellen der Frage:', error);
      }
    },
    async deleteSelectedQuestion() {

    },
    async getSurvey() {
      try {
        const token = localStorage.getItem('token');
        const surveyId = localStorage.getItem('survey-created-id');

        const response = await axios.get(`http://127.0.0.1:8002/surveys/${surveyId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const surveyData = response.data;
          this.surveyTitle = surveyData.title; // Setzen Sie den Umfrage-Titel
          this.surveyDescription = surveyData.description; // Setzen Sie die Umfrage-Beschreibung
          this.surveyQuestions = surveyData.questions; // Setzen Sie die Umfrage-Fragen
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Umfrage:', error);
      }
    },
  }
};
</script>

<style scoped>
.create-survey-page {
  display: flex;
  justify-content: center;
  align-items: center; /* In der Mitte des Bildschirms ausrichten */
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px; /* Abstand zwischen den Formularen und der Liste */
}

.question-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px; /* Abstand zwischen den Formularen und der Liste */
}

.question-list-box {
  max-height: 600px;
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid #444;
}

.delete-btn {
  background-color: #d32f2f;
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
