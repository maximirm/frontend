<template>
  <div class="create-survey-form">
    <div class="response-form">
      <CreateSurveyForm
          v-if="surveyFormVisible"
          :title="title"
          :description="description"
          @createSurvey="createSurvey"/>
      <CreateQuestionForm
          v-if="!surveyFormVisible"
          @createQuestion="createQuestion"/>
    </div>

    <div class="question-list-container">
      <div class="survey-info">
        <h3>{{ surveyTitle }}</h3>
        <p>{{ surveyDescription }}</p>
      </div>

      <QuestionCatalog
          :questions="questions"
          :selectedQuestion="selectedQuestion"
          @questionSelected="selectQuestion"/>
      <FeedbackMessage
          v-if="feedbackMessage"
          :messageType="'success'"
          :message="feedbackMessage"/>
      <StyledButton
          v-if="selectedQuestion"
          :label="'Frage löschen'"
          :onClickMethod="deleteSelectedQuestion"
          :isDisabled="!selectedQuestion"
          :class="'red-btn'"/>
    </div>
  </div>
</template>

<script>
import CreateSurveyForm from "@/components/forms/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/forms/CreateQuestionForm.vue";
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import {deleteQuestion, fetchSurvey, postQuestion, postSurvey} from "@/api/surveyApi";

export default {
  components: {
    StyledButton,
    QuestionCatalog,
    FeedbackMessage,
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
      feedbackMessage: '',
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
        this.feedbackMessage = "Frage erfolgreich gelöscht";
        setTimeout(() => this.feedbackMessage = '', 3000);
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
    redirectToLandingPage() {
      this.$router.push({name: 'LandingPage'});
    },
  }
};
</script>

<style scoped>

.create-survey-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.response-form {
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

</style>
