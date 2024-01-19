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

      <QuestionList
          :questions="questions"
          :selectedQuestion="selectedQuestion"
          @questionSelected="selectQuestion"/>

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
import CreateSurveyForm from "@/components/forms/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/forms/CreateQuestionForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import FeedbackMessage from "@/components/utils/FeedbackMessage.vue";
import {deleteQuestion, fetchSurvey, postQuestion, postSurvey} from "@/api/surveyApi";
import QuestionList from "@/components/lists/QuestionList.vue";

export default {
  components: {
    QuestionList,
    FeedbackMessage,
    BaseButton,
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
          creator_id: creatorId,
        }
        const response = await postSurvey(token, survey);

        this.createdSurveyId = response.id;
        this.surveyFormVisible = false;
      } catch (error) {
        console.log("error", error);
        alert("Fehler beim Erstellen der Umfrage - Bitte neu einloggen");
        this.redirectToLandingPage();
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
        await this.getSurvey();
      } catch (error) {
        alert("Fehler beim Erstellen der Frage - Bitte neu einloggen");
        this.redirectToLandingPage();
      }
    },
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    async deleteSelectedQuestion() {
      if (!this.selectedQuestion) return;

      try {
        const token = this.$store.state.userToken;
        await deleteQuestion(token, this.selectedQuestion.id);
        await this.getSurvey();

        this.selectedQuestion = null;
        this.message = "Frage erfolgreich gelöscht";
        setTimeout(() => this.message = '', 3000);
      } catch (error) {
        alert("Fehler beim Löschen der Frage");
        this.redirectToLandingPage();

      }
    },
    async getSurvey() {
      try {
        const token = this.$store.state.userToken;
        const surveyData = await fetchSurvey(token, this.createdSurveyId);
        this.surveyTitle = surveyData.title;
        this.surveyDescription = surveyData.description;
        this.questions = surveyData.questions;
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


.delete-btn {
  background-color: #d32f2f;
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

</style>