<template>
  <div class="survey-page">
      <div class="input-form">
        <CreateSurveyForm
            v-if="surveyFormVisible"
            :title="title"
            :description="description"
            @createSurvey="createSurvey"/>

        <div v-if="!surveyFormVisible">
          <CreateQuestionForm
              @createQuestion="createQuestion"/>
          <StyledButton
              :label="'Frage löschen'"
              :onClickMethod="deleteSelectedQuestion"
              :isDisabled="!selectedQuestion"
              :class="'red-btn'"/>
        </div>
        <div class="fixed-panel">
        <QuestionCatalog

            :questions="questions"
            :selectedQuestion="selectedQuestion"
            @questionSelected="selectQuestion"/>
        </div>
      </div>
      <div class="button-container">
        <FeedbackMessage
            v-if="feedbackMessage"
            :messageType="'success'"
            :message="feedbackMessage"/>

        <StyledButton
            :onClickMethod="redirectToEditorPage"
            :label="'Zurück'"
            :class="'red-btn'"/>
        <LogoutButton/>
      </div>
    </div>
</template>

<script>
import CreateSurveyForm from "@/components/forms/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/forms/CreateQuestionForm.vue";
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import {deleteQuestion, fetchSurvey, postQuestion, postSurvey} from "@/scripts/api/surveyApi";
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
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
          creator_id: creatorId,
          title: data.title,
          description: data.description,
          is_public: data.isPublic
        }
        const response = await postSurvey(token, survey);

        this.createdSurveyId = response.id;
        this.surveyFormVisible = false;
        await this.getSurvey();
      } catch (error) {

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
    redirectToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },
  }
};
</script>

<style scoped>

.survey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;

}

.input-form {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

}


.button-container {
  display: flex;
  gap: 10px;
}


.fixed-panel {
  position: sticky;
  top: 0;
  right: 0;
  width: 500px;
  height: 600px;
  overflow-y: auto;
  z-index: 1;
}
</style>
