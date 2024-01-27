<template>
  <BoxWrapper
      height="650px"
      width="850px">
    <div class="create-survey-page">
      <div class="wrapper">
        <div class="input-form">
          <CreateSurveyForm
              v-if="surveyFormVisible"
              :title="title"
              :description="description"
              @createSurvey="createSurvey"/>

          <div v-if="!surveyFormVisible">
            <CreateQuestionForm
                @createQuestion="createQuestion"/>
          </div>
        </div>

        <div class="fixed-panel">
          <h2 v-if="questions.length > 0">Fragestellungen</h2>
          <QuestionCatalog
              :questions="questions"
              :selectedQuestion="selectedQuestion"
              @questionSelected="selectQuestion"/>

          <div class="button-container">
            <FeedbackMessageWrapper>
              <FeedbackMessage
                  v-if="feedbackMessage"
                  :messageType="'success'"
                  :message="feedbackMessage"/>
            </FeedbackMessageWrapper>
            <StyledButton
                v-if="questions.length > 0"
                :label="'Frage löschen'"
                :onClickMethod="deleteSelectedQuestion"
                :isDisabled="!selectedQuestion"
                :class="'red-btn'"/>
          </div>
        </div>
      </div>
    </div>
  </BoxWrapper>
</template>

<script>

import {deleteQuestion, fetchSurvey, postQuestion, postSurvey} from "@/scripts/api/surveyApi";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";
import CreateSurveyForm from "@/components/forms/CreateSurveyForm.vue";
import CreateQuestionForm from "@/components/forms/CreateQuestionForm.vue";
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";
import FeedbackMessage from "@/components/generic/FeedbackMessage.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import FeedbackMessageWrapper from "@/components/generic/FeedbackMessageWrapper.vue";

export default {
  components: {
    FeedbackMessageWrapper,
    StyledButton,
    FeedbackMessage,
    QuestionCatalog,
    CreateQuestionForm,
    CreateSurveyForm,
    BoxWrapper

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

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
}

.create-survey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  overflow: hidden;
  width: 100%

}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.input-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fixed-panel {
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
