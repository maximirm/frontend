<template>
  <div class="response-page">
       <div v-if="currentQuestionIndex < questions.length">
    <ResponseForm
        :question="questions[currentQuestionIndex]"
        @responseTextSubmitted="handleResponseSubmitted"/>
    <ProgressBar
        :progressBarWidth="progressBarWidth"/>
    <StyledButton
        :onClickMethod="redirectToRespondentPage"
        :label="'Zurück'"/>
       </div>
  </div>
</template>

<script>
import ResponseForm from "@/components/forms/ResponseForm.vue";
import ProgressBar from "@/components/utils/ProgressBar.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";

export default {
  components: {
    StyledButton,
    ProgressBar,
    ResponseForm
  },
  data() {
    return {
      selectedSurvey: null,
      questions: [],
      currentQuestionIndex: 0,
      respondentIsAnonymous: true,
    };
  },
  computed: {
    progressBarWidth() {
      const totalQuestions = this.questions.length;
      const progress = ((this.currentQuestionIndex + 1) / totalQuestions) * 100;
      return `${progress}%`;
    },
  },
  methods: {
    handleResponseSubmitted() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        alert("Umfrage abgeschlossen. Vielen Dank");
        this.$router.push({name: 'RespondentPage', params: {respondentIsAnonymous: this.respondentIsAnonymous}});
      }
    },

    redirectToRespondentPage() {
      this.$router.push({name: 'RespondentPage', params: {respondentIsAnonymous: this.respondentIsAnonymous}});
    }
  },
  created() {
    this.selectedSurvey = this.$store.state.selectedSurvey;
    this.questions = this.selectedSurvey.questions;
    this.respondentIsAnonymous = this.$route.params.respondentIsAnonymous;
  },
};
</script>

<style scoped>

.response-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
}

</style>
