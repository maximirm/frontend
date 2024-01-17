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
        <CreateQuestionForm @create-question="createQuestion"/>
      </div>
    </div>
    <!-- Anzeigen der Umfrage-Fragen -->
    <div class="question-list-container">
      <div class="survey-info">
        <h3>{{ surveyTitle }}</h3>
        <p>{{ surveyDescription }}</p>
      </div>
      <div class="question-list-box">
        <QuestionInfo
            v-for="(question, index) in questions"
            :key="index"
            :question="question"
            :isSelected="selectedQuestion && selectedQuestion.id === question.id"
            @questionSelected="selectQuestion"
        />
      </div>
      <div v-if="message" class="success-message">{{ message }}</div>
      <div v-if="selectedQuestion">
      <BaseButton
          :buttonText="'Frage löschen'"
          :clickHandler="deleteSelectedQuestion"
          :isDisabled="!selectedQuestion"
          class="delete-btn"
      />
      </div>
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
      questions: [],
      selectedQuestion: null,
      message: ''
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
          type: questionData.questionType,
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
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    async deleteSelectedQuestion() {
      if (!this.selectedQuestion) return;

      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:8002/questions/${this.selectedQuestion.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.selectedQuestion = null;
          await this.getSurvey();
          this.message = "Frage erfolgreich gelöscht"; // Setzen der Meldung
          setTimeout(() => this.message = '', 3000); // Meldung nach 3 Sekunden ausblenden
        }
      } catch (error) {
        this.message = "Fehler beim Löschen der Frage"; // Meldung im Fehlerfall
      }
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
          this.surveyTitle = surveyData.title;
          this.surveyDescription = surveyData.description;
          console.log(surveyData.questions)
          this.questions = surveyData.questions;
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
  align-items: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.question-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
}

.survey-info {
  text-align: center;
  margin-bottom: 20px;
}

.question-list-box {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #444;
}

.delete-btn {
  background-color: #d32f2f; /* Lebendige rote Farbe für Löschen-Button */
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
