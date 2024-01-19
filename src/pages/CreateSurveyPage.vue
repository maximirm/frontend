<template>
  <div class="create-survey-page">
    <div class="form-container">
      <CreateSurveyForm
          v-if="surveyFormVisible"
          :title="title"
          :description="description"
          @create-survey="createSurvey"/>
      <CreateQuestionForm
          v-if="!surveyFormVisible"
          @create-question="createQuestion"/>
    </div>

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
            @questionSelected="selectQuestion"/>
      </div>

      <FeedbackMessage
          v-if="message"
          :message-class="'success'"
          :message="message"/>
      <BaseButton
          v-if="selectedQuestion"
          :buttonText="'Frage löschen'"
          :clickHandler="deleteSelectedQuestion"
          :isDisabled="!selectedQuestion"
          class="delete-btn"/>
    </div>
  </div>
</template>

<script>
import CreateSurveyForm from "@/components/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/CreateQuestionForm.vue";
import axios from 'axios';
import QuestionInfo from "@/components/QuestionInfo.vue";
import BaseButton from "@/components/BaseButton.vue";
import {postQuestion, postSurvey} from "@/api/api";
import FeedbackMessage from "@/components/FeedbackMessage.vue";

export default {
  components: {
    FeedbackMessage,
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
      message: '',
      createdSurveyId: null,
    };
  },
  methods: {
    async createSurvey(data) {
      try {
        const token = this.$store.state.userToken;
        const creatorId = this.$store.state.userId;
        const survey = {
          title: data.title,
          description: data.description,
          creator_id: creatorId
        }
        const response = await postSurvey(token, survey)

        this.createdSurveyId = response.id;
        this.surveyFormVisible = false;
      } catch (error) {
        console.log("error", error)
        alert("Fehler beim Erstellen der Umfrage - Bitte neu einloggen")
        this.redirectToLandingPage()
      }
    },
    redirectToLandingPage() {
      this.$router.push({name: 'LandingPage'});
    },
    async createQuestion(questionData) {
      try {
        const token = this.$store.state.userToken;
        const surveyId = this.createdSurveyId;

        const question = {
          survey_id: surveyId,
          order: this.questionOrder,
          question_text: questionData.questionText,
          type: questionData.questionType,
          options: questionData.questionType === 1 ? [] : questionData.options,
        };

        await postQuestion(token, question);
        this.questionOrder++;
        await this.getSurvey()
      } catch (error) {
        alert("Fehler beim Erstellen der Frage - Bitte neu einloggen")
        this.redirectToLandingPage()
      }
    },
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    async deleteSelectedQuestion() {
      if (!this.selectedQuestion) return;

      try {
        const token = this.$store.state.userToken;
        const response = await axios.delete(`http://127.0.0.1:8002/questions/${this.selectedQuestion.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.selectedQuestion = null;
          await this.getSurvey();
          this.message = "Frage erfolgreich gelöscht";
          setTimeout(() => this.message = '', 3000);
        }
      } catch (error) {
        this.message = "Fehler beim Löschen der Frage";
      }
    },

    async getSurvey() {
      try {
        const token = this.$store.state.userToken;
        const surveyId = this.createdSurveyId;

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
  width: 600px;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: thin; /* Breite der Scrollleiste festlegen */
  scrollbar-color: #555 #444; /* Farbe der Scrollleiste festlegen */
}

.question-list-box::-webkit-scrollbar {
  width: 8px; /* Breite der Webkit-Scrollleiste festlegen */
}

.question-list-box::-webkit-scrollbar-thumb {
  background-color: #555; /* Farbe des Scrollbalken-Daumens festlegen */
}

.question-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777; /* Farbe des Scrollbalken-Daumens bei Hover festlegen */
}

.delete-btn {
  background-color: #d32f2f; /* Lebendige rote Farbe für Löschen-Button */
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

</style>
